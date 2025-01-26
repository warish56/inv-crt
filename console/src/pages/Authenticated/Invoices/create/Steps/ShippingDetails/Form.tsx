
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { 
  Business,
  LocationCity,
  MarkunreadMailbox,
  LocationOn
} from '@mui/icons-material';

import { FormField } from '../../../../../../components/Form/FormField';
import { ReactFormExtendedApi } from '@tanstack/react-form';
import { IndianStates } from '@constants/states';
import { useAutoSaveAtom } from '../../hooks/useAutoSaveAtom';

type shippingDetails = {
    address: string;
    city: string;
    postalCode: string;
    state: string;
}

type props = {
    title: string; 
    icon: React.ReactNode; 
    bgColor?: string;
    type: 'from' | 'to';
    checkboxChecked: boolean;
    onCheckBoxToggled: (checkd: boolean) => void;
    form: ReactFormExtendedApi<shippingDetails, undefined>;
    formDisabled: boolean;
    showCheckBox?: boolean;
}
export const ShippingDetailsForm = ({
    title, 
    icon, 
    form,
    onCheckBoxToggled,
    checkboxChecked,
    bgColor = 'grey.50',
    formDisabled,
    showCheckBox=false,
    type
}:props) => {
    const {triggerAutoSave} = useAutoSaveAtom();
    return (
        <Paper 
        elevation={0}
        component="form"
        onBlur={() => {
          form.handleSubmit();
          triggerAutoSave();
        }}
        sx={{ 
          p: 3, 
          mb: 3,
          bgcolor: bgColor,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4,
          pb: 2,
          borderBottom: '2px solid',
          borderColor: 'primary.light',
        }}>
           <Stack direction="row" sx={{
            alignItems: 'center'
           }}>
            <Box sx={{ 
                mr: 2, 
                display: 'flex', 
                alignItems: 'center', 
                color: 'primary.main',
                bgcolor: 'primary.lighter',
                p: 1,
                borderRadius: 1,
            }}>
                {icon}
            </Box>
            <Typography variant="h6" color="primary.main" fontWeight="600">
                {title}
            </Typography>
          </Stack>

         {showCheckBox && 
          <FormControlLabel
              control={
                <Checkbox 
                  checked={checkboxChecked} 
                  onChange={(e) => onCheckBoxToggled(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography color="text.secondary">
                  {type === 'from' ? 'Same as selected business' : 'Same as selected customer'}
                </Typography>
              }
            />
          }
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form.Field name='address'>
                {(field) => (
                    <FormField
                    field={field}
                    fullWidth
                    disabled={formDisabled}
                    label="Business Address"
                    icon={<Business color='primary'/>}
                    multiline
                    rows={3}
                    />
                )}
            </form.Field>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <form.Field name='state'>
            {(field) => (
                <FormField
                select
                fullWidth
                field={field}
                label="State"
                disabled={formDisabled}
                icon={<LocationOn color='primary'/>}
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

          <Grid item xs={12} sm={6} md={4}>
            <form.Field name='city'>
            {(field) => (
                <FormField
                field={field}
                label="City"
                disabled={formDisabled}
                onChange={(e) => {
                    return e.target.value.toUpperCase();
                }}
                icon={<LocationCity color='primary'/>}
                />
            )}
            </form.Field>
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
          <form.Field name='postalCode'>
            {(field) => (
                <FormField
                field={field}
                label="Post/ZIP Code"
                disabled={formDisabled}
                onChange={(e) => {
                    const value = e.target.value
                    return isNaN(Number(value)) ? value.substring(0, value.length-1) : value
                }}
                icon={<MarkunreadMailbox color='primary'/>}
                />
            )}
            </form.Field>
          </Grid>


        </Grid>
      </Paper>
    )
}