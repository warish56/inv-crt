import { useState } from 'react';
import {
  TextField,
  MenuItem,
  Typography,
  Paper,
  Grid,
  InputAdornment,
} from '@mui/material';
import {
  Inventory2Outlined,
  DescriptionOutlined,
  Receipt,
  CurrencyRupee,
  Calculate,
} from '@mui/icons-material';
import { GST_Rates } from '../../constants/gst';
import { calculateTotalTaxes } from '../../utils/tax';
import { GoodsType, SupplyType } from '@types/tax';
import { SubStepHeader } from '../../components/SubStepHeader';



type state = {
  itemType: GoodsType | '';
  name: string;
  description: string;
  price: string;
  hsnSac: string;
  gstRate: string;
  supplyType: SupplyType;
  placeOfSupply: string; 
}

type props = {
  onBack: () => void;
}

export const ServiceDetails = ({onBack}:props) => {
  const [itemDetails, setItemDetails] = useState<state>({
    itemType: '',
    name: '',
    description: '',
    price: '',
    hsnSac: '',
    gstRate: '18', // Default GST rate
    supplyType: 'intraState', // intraState, interState, unionTerritory
    placeOfSupply: '', // State/UT code
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate tax amounts based on price, GST rate and supply type
  const calculateTaxes = () => {

    return calculateTotalTaxes({
      price:itemDetails.price,
      gstRate:itemDetails.gstRate,
      supplyType: itemDetails.supplyType
    })

     };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setItemDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateField = (name:string, value:string) => {
    switch (name) {
      case 'price':
        return !value || isNaN(Number(value)) ? 'Please enter a valid price' : '';
      case 'hsnSac':
        return !value ? 'HSN/SAC code is required' : '';
      case 'placeOfSupply':
        return !value ? 'Place of supply is required' : '';
      default:
        return !value ? 'This field is required' : '';
    }
  };

  const handleBlur = (event:React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const taxes = calculateTaxes();

  return (
    <Paper sx={{ 
      maxWidth: 800, 
      mx: 'auto', 
      bgcolor: 'background.default',
      boxShadow: 0 
      }}>

      <SubStepHeader 
        title='Product/Service Details'
        description='Add the required product and services provided'
        onBack={onBack}
      />

      <Grid container spacing={3}>
        {/* Item Type Selection */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Item Type"
            name="itemType"
            value={itemDetails.itemType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.itemType}
            helperText={errors.itemType}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory2Outlined color="primary" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="product">Product</MenuItem>
            <MenuItem value="service">Service</MenuItem>
          </TextField>
        </Grid>

        {/* Name Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={itemDetails.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionOutlined color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={itemDetails.description}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionOutlined color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* HSN/SAC Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="HSN/SAC Code"
            name="hsnSac"
            value={itemDetails.hsnSac}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.hsnSac}
            helperText={errors.hsnSac}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Receipt color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Price Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={itemDetails.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.price}
            helperText={errors.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupee color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        

        {/* GST Rate Selection */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="GST Rate"
            name="gstRate"
            value={itemDetails.gstRate}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calculate color="primary" />
                </InputAdornment>
              ),
            }}
          >
            {GST_Rates.map((rate) => (
              <MenuItem key={rate} value={rate}>
                {rate}%
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};