import {
  MenuItem,
  Paper,
  Grid,
} from '@mui/material';
import {
  Inventory2Outlined,
  DescriptionOutlined,
  Receipt,
  CurrencyRupee,
  Calculate,
  Numbers as NumbersIcon
} from '@mui/icons-material';
import { GST_Rates } from '../../constants/gst';
import { SubStepHeader } from '../../components/SubStepHeader';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from '@hooks/useSnackbar';
import { useForm } from '@tanstack/react-form';
import { FormField } from '../../common/FormField';
import { useServiceAtom } from '../../hooks/useServiceAtom';
import { generateUniquId } from '@utils/common';



type formState = {
  type: 'product' | 'service';
  name: string;
  description: string;
  code: string;
  price: string;
  gst: string;
  qty: string;
}

type props = {}

export const CreateOrEditService = ({}:props) => {

  const {serviceId} = useParams();
  const navigate = useNavigate();
  const isEditMode = !!serviceId

  const {showSnackbar} = useSnackbar();
  const {addService, updateService, services} = useServiceAtom();

  const serviceData = services.find(service => service.id === serviceId)


  const onBack = () => {
    navigate(-1);
  }

  const form = useForm<formState>({
    defaultValues: {
      type: serviceData?.type ?? 'service',
      name: serviceData?.name ?? '',
      description: serviceData?.description ?? '',
      code: serviceData?.code ?? '',
      price: serviceData?.price ?? '',
      gst: serviceData?.gst ?? '',
      qty: serviceData?.qty ?? '',
    },
    onSubmit: ({value, formApi}) => {
      const data = {
        id: isEditMode ? (serviceData?.id ?? '') : generateUniquId(),
        ...value,
      }
      
      if(isEditMode){
        updateService(data)
      }else{
        addService(data)
      }
      
      showSnackbar({message: `Service ${isEditMode ? 'updated' : 'added'} successfully`, type:'succes'});
      formApi.reset({
        type: 'service',
        name:  '',
        description: '',
        code:  '',
        price: '',
        gst:  '',
        qty: '',
      })
    }
  })
  

  return (
    <Paper 
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      sx={{ 
        maxWidth: 800, 
        mx: 'auto', 
        bgcolor: 'background.default',
        boxShadow: 0 
      }}
      >

      <SubStepHeader 
        title='Product/Service Details'
        description='Add the required product and services provided'
        onBack={onBack}
        actionBtnText={isEditMode ? 'Update Details' : 'Save Details'}
        btnProps={{
         type:'submit'
        }}
      />

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
           <form.Field name='type'>
                {(field) => (
                    <FormField 
                    select
                    fullWidth
                    label="Item Type"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <Inventory2Outlined color="primary" /> }
                    >
                        <MenuItem value="product">Product</MenuItem>
                        <MenuItem value="service">Service</MenuItem>
                    </FormField>
                )}
           </form.Field>
        </Grid>

        <Grid item xs={12} sm={6}>
          <form.Field name='name'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Name"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <DescriptionOutlined color="primary" /> }
                    />
                )}
           </form.Field>
        </Grid>

        <Grid item xs={12}>
           <form.Field name='description'>
                {(field) => (
                    <FormField 
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    field={field}
                    icon={ <DescriptionOutlined color="primary" /> }
                    />
                )}
           </form.Field>
        </Grid>

        <Grid item xs={12} sm={6}>
           <form.Field name='code'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="HSN/SAC Code"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <Receipt color="primary" /> }
                    />
                )}
           </form.Field>
        </Grid>


        <Grid item xs={12} sm={6}>
           <form.Field name='gst'>
                {(field) => (
                    <FormField 
                    select
                    fullWidth
                    label="GST Rate"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <Calculate color="primary" /> }
                    >
                       {GST_Rates.map((rate) => (
                          <MenuItem key={rate} value={rate}>
                            {rate}%
                          </MenuItem>
                        ))}
                    </FormField>
                )}
           </form.Field>
        </Grid>

        <Grid item xs={12} sm={6}>
           <form.Field name='price'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Price"
                    field={field}
                    onChange={(e) => {
                      const value = e.target.value
                      return isNaN(Number(value)) ? value.substring(0, value.length-1) : value
                    }}
                    icon={ <CurrencyRupee color="primary" /> }
                    />
                )}
           </form.Field>
        </Grid>


        <Grid item xs={12} sm={6}>
           <form.Field name='qty'>
                {(field) => (
                    <FormField 
                    fullWidth
                    type='number'
                    label="Quantity"
                    field={field}
                    icon={ <NumbersIcon color="primary" /> }
                    />
                )}
           </form.Field>
        </Grid>
        
      </Grid>
    </Paper>
  );
};