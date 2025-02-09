import {
  Card,
  CardContent,
  Grid,
  MenuItem,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  AccountBalance as AccountBalanceIcon,
  Public as PublicIcon,
  LocationCity as LocationCityIcon,
  MarkunreadMailbox as PostalIcon,
  AccountBalanceWallet as PANIcon
} from '@mui/icons-material';
import { SubStepHeader } from '../../components/SubStepHeader';
import { useNavigate, useParams } from 'react-router';
import { useCreateOrEditCustomer } from './hooks/useCreateOrEditCustomer';
import { useCustomersList } from '../../Steps/CustomerSelection/hooks/useCustomersList';
import { useSnackbar } from '@hooks/useSnackbar';
import { useForm } from '@tanstack/react-form';
import { FormHeader } from '../../common/FormHeader';
import { FormField } from '../../../../../../components/Form/FormField';
import { Countries, IndianStates } from '@constants/states';



const attributes = {
  businessName: 'name',
  email: 'email',
  phoneNumber: 'phone',
  address: 'string',
  city: 'city',
  state: 'state',
  postalCode: 'postalCode',
  country: 'country',
  gstin: 'gstin',
  pan: 'pan'
}

type CustomerDetails = Record<keyof typeof attributes, string>
type props = {}

export const CreateOrEditCustomer= ({}:props) => {
  const {customerId} = useParams();
  const navigate = useNavigate();
  const isEditMode = !!customerId

  const mutation = useCreateOrEditCustomer(isEditMode? 'edit' : 'create');
  const {showSnackbar} = useSnackbar();
  const {data: businessList} = useCustomersList({userId:'1'})

  const list = (businessList?.[0]?.customers) ?? [];
  const customerData = list.find(customer => customer.$id === customerId)


  const onBack = () => {
    navigate(-1);
  }

  const form = useForm<CustomerDetails>({
    defaultValues: {
      businessName: customerData?.business_name ?? '',
      email: customerData?.email ?? '',
      phoneNumber: customerData?.phone_number ?? '',
      address: customerData?.address ?? '',
      city: customerData?.city ?? '',
      state: customerData?.state ?? '',
      postalCode: customerData?.postal_code ?? '',
      country: 'India',
      gstin: customerData?.gstin ?? '',
      pan: customerData?.pan ?? ''
    },
    onSubmit: ({value}) => {
      mutation.mutateAsync({
        ...value,
        customerId,
        userId: '1'
      }).then((res) => {
          const [_, error] = res;
          if(error){
            showSnackbar({message: error, type:'error'});
          }else{
            showSnackbar({message: `Customer ${isEditMode ? 'updated' : 'created'} successfully`, type:'succes'});
            onBack();
          }
      });
    }
  })


  return (
    <Card 
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit()
      }}
      sx={{ 
        borderRadius: 2,
        boxShadow: 'none',
        bgcolor: 'background.default'
      }}
    >
      <SubStepHeader 
       title='Client details'
       description='Fill the required client details'
       onBack={onBack}
       actionBtnText={mutation.isPending  ? 'Saving' : ( isEditMode ? 'Update Details' : 'Save Details')}
       loading={mutation.isPending}
       btnProps={{
        type:'submit'
       }}
      />

       <CardContent>
        <Grid container spacing={3}>
          <FormHeader title='Required Information'/>

          <Grid item xs={12}>
            <form.Field name='businessName'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="Business Name"
                  field={field}
                  icon={<BusinessIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12} md={6}>
            <form.Field name='country'>
              {(field) => (
                  <FormField 
                  select
                  fullWidth
                  label="Country"
                  field={field}
                  disabled
                  icon={<PublicIcon sx={{ color: 'primary.main' }} />}
                  >
                     {Countries.map(country => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                  </FormField>
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12} md={6}>
            <form.Field name='phoneNumber'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="Phone Number"
                  field={field}
                  icon={<PhoneIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <FormHeader title='Additional Information (Optional)'/>

          <Grid item xs={12} md={6}>
            <form.Field name='gstin'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="GSTIN"
                  field={field}
                  onChange={(e) => {
                    return e.target.value.toUpperCase();
                  }}
                  icon={<BadgeIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12} md={6}>
            <form.Field name='pan'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="PAN Number"
                  field={field}
                  onChange={(e) => {
                    return e.target.value.toUpperCase();
                  }}
                  icon={<PANIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12}>
            <form.Field name='address'>
              {(field) => (
                  <FormField 
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  field={field}
                  icon={<LocationIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>


          <Grid item xs={12} md={6}>
            <form.Field name='state'>
              {(field) => (
                  <FormField 
                  select
                  fullWidth
                  label="State"
                  field={field}
                  icon={ <AccountBalanceIcon sx={{ color: 'primary.main' }} />}
                  >
                    <MenuItem  value="">
                        Select State
                    </MenuItem>
                    {IndianStates.map(state => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </FormField>
              )}
            </form.Field>
          </Grid>


          <Grid item xs={12} md={6}>
            <form.Field name='city'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="City"
                  field={field}
                  onChange={(e) => {
                    return e.target.value.toUpperCase();
                  }}
                  icon={ <LocationCityIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12} md={6}>
            <form.Field name='postalCode'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="Postal Code"
                  field={field}
                  onChange={(e) => {
                    const value = e.target.value
                    return isNaN(Number(value)) ? value.substring(0, value.length-1) : value
                  }}
                  icon={ <PostalIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>


          <Grid item xs={12} md={6}>
            <form.Field name='email'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="Email"
                  field={field}
                  icon={<EmailIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

