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
  AccountBalanceWallet as PANIcon,
} from '@mui/icons-material';
import { SubStepHeader } from '../../components/SubStepHeader';
import { FormHeader } from './FormHeader';
import { useForm } from '@tanstack/react-form';
import { FormField } from './FormField';
import { Countries, IndianStates } from '@constants/states';
import { nonEmptyValidator, phoneValidator, validateField } from '@utils/validators';
import { useCreateOrEditBusiness } from './hooks/useCreateOrEditBusiness';
import { useSnackbar } from '@hooks/useSnackbar';
import { useNavigate, useParams } from 'react-router';
import { useBusinessList } from '../../Steps/BusinessSelection/hooks/useBusinessList';


const attributes = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  address: 'string',
  city: 'city',
  state: 'state',
  postalCode: 'postalCode',
  country: 'country',
  gstin: 'gstin',
  pan: 'pan'
}

type BusinessDetails = Record<keyof typeof attributes, string>

type props = {}

export const BusinessDetailsStep= ({}:props) => {
  const {businessId} = useParams();
  const navigate = useNavigate();
  const isEditMode = !!businessId

  const mutation = useCreateOrEditBusiness(isEditMode? 'edit' : 'create');
  const {showSnackbar} = useSnackbar();
  const {data: businessList} = useBusinessList({userId:'1'})

  const list = (businessList?.[0]?.businesses) ?? [];
  const businessData = list.find(business => business.$id === businessId)


  const onBack = () => {
    navigate(-1);
  }

  const form = useForm<BusinessDetails>({
    defaultValues: {
      name: businessData?.name ?? '',
      email: businessData?.email ?? '',
      phone: businessData?.phone ?? '',
      address: businessData?.address ?? '',
      city: businessData?.city ?? '',
      state: businessData?.state ?? '',
      postalCode: businessData?.postal_code ?? '',
      country: 'India',
      gstin: businessData?.gstin ?? '',
      pan: businessData?.pan ?? ''
    },
    onSubmit: ({value}) => {
      mutation.mutateAsync({
        ...value,
        businessId,
        userId: '1'
      }).then((res) => {
          const [_, error] = res;
          if(error){
            showSnackbar({message: error, type:'error'});
          }else{
            showSnackbar({message: `Business ${isEditMode ? 'updated' : 'created'} successfully`, type:'succes'});
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
        bgcolor: 'background.default',
      }}
    >
      <SubStepHeader 
       title='Business details'
       description='Fill the required business details'
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
            <form.Field name='name'
            validators={{
              onChange: ({value, fieldApi}) => {
                const validators = [
                  {
                    validator: nonEmptyValidator,
                    errorMessage: 'Business name is required'
                  }
                ]
                fieldApi.setErrorMap({onBlur: ''})
                return validateField(value, validators);
              },
              onBlur: ({value}) => {
                  const validators = [
                    {
                      validator: nonEmptyValidator,
                      errorMessage: 'Business name is required'
                    }
                  ]
                  return validateField(value, validators);
              }
            }}
            >
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
                    disabled
                    field={field}
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
            <form.Field name='phone'
              validators={{
                onChange: ({value, fieldApi}) => {
                  const validators = [
                    {
                      validator: nonEmptyValidator,
                      errorMessage: 'Phone number is required'
                    },
                    {
                      validator: phoneValidator,
                      errorMessage: 'Invalid phone number'
                    }
                  ];
                  fieldApi.setErrorMap({onBlur: ''})
                  return validateField(value, validators);
                },
                onBlur: ({value}) => {
                    const validators = [
                      {
                        validator: nonEmptyValidator,
                        errorMessage: 'Phone number is required'
                      },
                    ]
                    return validateField(value, validators);
                }
              }}
            >
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
                  icon={ <BadgeIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12} md={6}>
            <form.Field name='pan'
            >
              {(field) => (
                  <FormField 
                  fullWidth
                  label="PAN Number"
                  field={field}
                  onChange={(e) => {
                    return e.target.value.toUpperCase();
                  }}
                  icon={ <PANIcon sx={{ color: 'primary.main' }} />}
                  />
              )}
            </form.Field>
          </Grid>

          <Grid item xs={12}>
            <form.Field name='address'>
              {(field) => (
                  <FormField 
                  fullWidth
                  label="Address"
                  field={field}
                  multiline
                  rows={3}
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

