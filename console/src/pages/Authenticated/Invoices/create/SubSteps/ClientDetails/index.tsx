import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  InputAdornment
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


type props = {
  onBack: () => void
}

export const ClientDetailsStep= ({onBack}:props) => {
  const [formData, setFormData] = useState({
    country: '',
    businessName: '',
    phoneNumber: '',
    gstin: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    email: '',
    panNumber: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'businessName':
        error = !value ? 'Business name is required' : '';
        break;
      case 'phoneNumber':
        error = !value 
          ? 'Phone number is required'
          : !/^\+?[\d\s-]{10,}$/.test(value)
            ? 'Invalid phone number'
            : '';
        break;
      case 'email':
        error = value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email address'
          : '';
        break;
      case 'postalCode':
        error = !value ? 'Postal code is required' : '';
        break;
      case 'country':
        error = !value ? 'Country is required' : '';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

  };

  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia'
  ];

  const indianStates = [
    'Andhra Pradesh',
    'Delhi',
    'Gujarat',
    'Karnataka',
    'Maharashtra',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
    // Add more states as needed
  ];

  return (
    <Card 
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
      />
       <CardContent>
        <Grid container spacing={3}>
          {/* Required Fields Section */}
          <Grid item xs={12}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 2,
                color: 'text.secondary',
                fontWeight: 500 
              }}
            >
              Required Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="businessName"
              label="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              error={!!errors.businessName}
              helperText={errors.businessName}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              error={!!errors.country}
              helperText={errors.country}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            >
              {countries.map(country => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Optional Fields Section */}
          <Grid item xs={12}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mt: 2,
                mb: 2,
                color: 'text.secondary',
                fontWeight: 500 
              }}
            >
              Additional Information (Optional)
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="gstin"
              label="GSTIN"
              value={formData.gstin}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="panNumber"
              label="PAN Number"
              value={formData.panNumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PANIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            >
              {indianStates.map(state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                name="postalCode"
                label="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                error={!!errors.postalCode}
                helperText={errors.postalCode}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PostalIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
              />
          </Grid>


          <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
              />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

