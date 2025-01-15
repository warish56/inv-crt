import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  Person as PersonIcon,
  CreditCard as CardIcon,
  Numbers as NumbersIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';
import { SubStepHeader } from '../../components/SubStepHeader';
import { useNavigate } from 'react-router';


type props = {}

export const BankingDetails= ({}:props) => {
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  }

  return (
    <Paper 
      elevation={0}
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
      />
      {/* Form Fields */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Bank Name"
            variant="outlined"
            placeholder="Enter your bank name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BankIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Account Holder Name"
            variant="outlined"
            placeholder="Enter account holder's name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Account Number"
            variant="outlined"
            placeholder="Enter your account number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CardIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="IFSC Code"
            variant="outlined"
            placeholder="Enter IFSC code"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            helperText="IFSC code can be found on your cheque or bank passbook"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={accountType}
              label="Account Type"
              onChange={(e) => setAccountType(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <WalletIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              }
            >
              <MenuItem value="savings">Savings Account</MenuItem>
              <MenuItem value="current">Current Account</MenuItem>
            </Select>
          </FormControl>
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