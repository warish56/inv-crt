import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { 
  LocalShipping, 
  PlaceOutlined,
  Business,
  LocationCity,
  MarkunreadMailbox,
  LocationOn
} from '@mui/icons-material';
import { StepHeader } from '../../components/StepHeader';

type ShippingDetails = {
  shipFrom: {
    businessAddress: string;
    city: string;
    postCode: string;
    state: string;
  };
  shipTo: {
    businessAddress: string;
    city: string;
    postCode: string;
    state: string;
  };
  shippingMethod: string;
  shippingCost: number;
};

type Props = {
  onSave?: (data: ShippingDetails) => void;
  initialData?: Partial<ShippingDetails>;
};

export const ShippingDetailsStep = ({ onSave, initialData }: Props) => {
  const [saveToClient, setSaveToClient] = React.useState(false);

  const AddressField = ({ 
    label, 
    icon, 
    multiline = false,
    ...props 
  }: { 
    label: string; 
    icon: React.ReactNode;
    multiline?: boolean;
    [key: string]: any;
  }) => (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      multiline={multiline}
      rows={multiline ? 3 : 1}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ color: 'primary.main' }}>
            {icon}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );

  const AddressSection = ({ 
    title, 
    icon, 
    prefix,
    bgColor = 'grey.50'
  }: { 
    title: string; 
    icon: React.ReactNode; 
    prefix: 'shipFrom' | 'shipTo';
    bgColor?: string;
  }) => (
    <Paper 
      elevation={0}
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
        mb: 3,
        pb: 2,
        borderBottom: '2px solid',
        borderColor: 'primary.light'
      }}>
        <Box sx={{ 
          mr: 2, 
          display: 'flex', 
          alignItems: 'center', 
          color: 'primary.main',
          bgcolor: 'primary.lighter',
          p: 1,
          borderRadius: 1
        }}>
          {icon}
        </Box>
        <Typography variant="h6" color="primary.main" fontWeight="600">
          {title}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddressField
            label="Business Address"
            icon={<Business />}
            multiline
            defaultValue={initialData?.[prefix]?.businessAddress}
            name={`${prefix}.businessAddress`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AddressField
            label="City"
            icon={<LocationCity />}
            defaultValue={initialData?.[prefix]?.city}
            name={`${prefix}.city`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AddressField
            label="Post/ZIP Code"
            icon={<MarkunreadMailbox />}
            defaultValue={initialData?.[prefix]?.postCode}
            name={`${prefix}.postCode`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AddressField
            label="State"
            icon={<LocationOn />}
            defaultValue={initialData?.[prefix]?.state}
            name={`${prefix}.state`}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box 
      component="form" 
      onSubmit={(e) => {
        e.preventDefault();
        // Form submission logic here
      }}
      sx={{ 
        bgcolor: 'background.default',
        borderRadius: 3
      }}
    >

      <StepHeader 
        title='Shipping Information'
        description='Add the required shipping details'
      />

      
      <AddressSection 
        title="Ship From" 
        icon={<LocalShipping fontSize="medium" />} 
        prefix="shipFrom"
        bgColor="background.paper"
      />
      
      <AddressSection 
        title="Ship To" 
        icon={<PlaceOutlined fontSize="medium" />} 
        prefix="shipTo"
        bgColor="background.paper"
      />

      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Shipping Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shipping Method"
              variant="outlined"
              defaultValue={initialData?.shippingMethod}
              name="shippingMethod"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shipping Cost"
              type="number"
              variant="outlined"
              defaultValue={initialData?.shippingCost}
              name="shippingCost"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 4,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'grey.200'
      }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={saveToClient} 
              onChange={(e) => setSaveToClient(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography color="text.secondary">
              Save shipping details to client profile
            </Typography>
          }
        />
        <Button 
          variant="contained" 
          size="large"
          type="submit"
          sx={{ 
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Save Details
        </Button>
      </Box>
    </Box>
  );
};