import {
  Box,
  Typography,
  Grid,
  Paper,
  InputLabel,
  MenuItem,
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  Person as PersonIcon,
  CreditCard as CardIcon,
  Numbers as NumbersIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';
import { SubStepHeader } from '../../components/SubStepHeader';
import { useNavigate, useParams } from 'react-router';
import { useCreateOrEditBank } from './hooks/useCreateOrEditBank';
import { useSnackbar } from '@hooks/useSnackbar';
import { useBanksList } from '../../Steps/BankSelection/hooks/useBanksList';
import { useForm } from '@tanstack/react-form';
import { FormField } from '../../../../../../components/Form/FormField';


const attributes = {
  accountNumber:'accountNumber',
  bankName:'bankName',
  holderName:'holderName',
  ifscCode:'ifscCode',
  accountType:'accountType',
}

type BankDetails = Record<keyof typeof attributes, string>
type props = {}

export const CreateOrEditBank= ({}:props) => {
  const {bankId} = useParams();
  const navigate = useNavigate();
  const isEditMode = !!bankId

  const mutation = useCreateOrEditBank(isEditMode? 'edit' : 'create');
  const {showSnackbar} = useSnackbar();
  const {data: businessList} = useBanksList({userId:'1'})

  const list = (businessList?.[0]?.banks) ?? [];
  const bankDataData = list.find(bank => bank.$id === bankId)


  const onBack = () => {
    navigate(-1);
  }

  const form = useForm<BankDetails>({
    defaultValues: {
      accountNumber: bankDataData?.acc_number ?? '',
      bankName: bankDataData?.name ?? '',
      holderName: bankDataData?.holder_name ?? '',
      ifscCode: bankDataData?.ifsc ?? '',
      accountType: bankDataData?.type ?? '',
    },
    onSubmit: ({value}) => {
      mutation.mutateAsync({
        ...value,
        bankId,
        userId: '1'
      }).then((res) => {
          const [_, error] = res;
          if(error){
            showSnackbar({message: error, type:'error'});
          }else{
            showSnackbar({message: `Bank ${isEditMode ? 'updated' : 'created'} successfully`, type:'succes'});
            onBack();
          }
      });
    }
  })

  return (
    <Paper 
      elevation={0}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit()
      }}
      sx={{ 
        borderRadius: 3,
        boxShadow: 'none',
        bgcolor: 'background.default'
      }}
    >

      <SubStepHeader 
        title='Banking Details'
        description=' Please provide your bank account information for payments'
        onBack={onBack}
        actionBtnText={mutation.isPending  ? 'Saving' : ( isEditMode ? 'Update Details' : 'Save Details')}
        loading={mutation.isPending}
        btnProps={{
         type:'submit'
        }}
      />
      {/* Form Fields */}
      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <form.Field name='bankName'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Bank Name"
                    placeholder="Enter your bank name"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <BankIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                    />
                )}
          </form.Field>
        </Grid>

        <Grid item xs={12} md={6}>
          <form.Field name='holderName'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Account Holder Name"
                    placeholder="Enter account holder's name"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                    />
                )}
          </form.Field>
        </Grid>

        <Grid item xs={12} md={6}>
          <form.Field name='accountNumber'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Account Number"
                    placeholder="Enter your account number"
                    field={field}
                    onChange={(e) => {
                      const value = e.target.value
                      return isNaN(Number(value)) ? value.substring(0, value.length-1) : value
                    }}
                    icon={ <CardIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                    />
                )}
          </form.Field>
        </Grid>

        <Grid item xs={12} md={6}>
          <form.Field name='ifscCode'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="IFSC Code"
                    placeholder="Enter IFSC code"
                    field={field}
                    helperText="IFSC code can be found on your cheque or bank passbook"
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <NumbersIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                    />
                )}
          </form.Field>
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{
            marginBottom: '10px'
          }}>Account Type</InputLabel>
          <form.Field name='accountType'>
              {(field) => (
                  <FormField 
                  select
                  fullWidth
                  field={field}
                  icon={ <WalletIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                  >
                    <MenuItem value="savings">Savings Account</MenuItem>
                    <MenuItem value="current">Current Account</MenuItem>
                  </FormField>
              )}
          </form.Field>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'rgba(194, 24, 91, 0.04)',
              border: '1px solid',
              borderColor: 'primary.light',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ fontSize: '1.2rem' }}>⚠️</Box>
              Please ensure all banking details are accurate. These details will be used for payment processing.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};