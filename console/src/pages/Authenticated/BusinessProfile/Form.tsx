import { 
  Grid, 
  MenuItem
} from '@mui/material';
import { nonEmptyValidator, phoneValidator, validateField } from '@utils/validators';
import { ReactFormExtendedApi } from '@tanstack/react-form';
import { FormField } from '@components/Form/FormField';

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
import { Countries, IndianStates } from '@constants/states';


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

type props = {
    form: ReactFormExtendedApi<BusinessDetails, undefined>
}
export const Form = ({form}:props) => {
    return (
        <Grid container spacing={3}>
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
                return validateField(validators, value);
              },
              onBlur: ({value}) => {
                  const validators = [
                    {
                      validator: nonEmptyValidator,
                      errorMessage: 'Business name is required'
                    }
                  ]
                  return validateField(validators, value);
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
                  return validateField(validators, value);
                },
                onBlur: ({value}) => {
                    const validators = [
                      {
                        validator: nonEmptyValidator,
                        errorMessage: 'Phone number is required'
                      },
                    ]
                    return validateField(validators, value);
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

          {/* <FormHeader title='Additional Information (Optional)'/> */}

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
    )
}