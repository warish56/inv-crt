import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  InputAdornment,
  Avatar,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Business as BusinessIcon,
  AccountBalance as BankIcon,
  CheckCircle as CheckCircleIcon,
  ContentCopy as CopyIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

type Bank = {
  id: number;
  name: string;
  holderName: string;
  accountNumber: string;
  ifsc: string;
  type: 'Savings' | 'Current';
}

type Props = {
  selectedBankId: number;
  onAddBank: () => void;
  handleSelectBank: (id: number) => void;
}

export const BankSelection = ({ selectedBankId, onAddBank, handleSelectBank }: Props) => {
  const formatAccountNumber = (number: string) => {
    return `••••${number.slice(-4)}`;
  };

  const getChipStyles = (type: string) => {
    if (type === 'Savings') {
      return {
        bgcolor: 'rgba(194, 24, 91, 0.08)',
        color: 'primary.main'
      };
    }
    return {
      bgcolor: 'rgba(0, 145, 139, 0.08)',
      color: '#00918b'
    };
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      {/* Header Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}
      >
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
              mb: 0.5
            }}
          >
            Select Bank Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a bank account for your transactions
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="medium"
          onClick={onAddBank}
        >
          Add Bank
        </Button>
      </Box>

      {/* Search Section */}
      <TextField
        fullWidth
        placeholder="Search banks by name or account number..."
        variant="outlined"
        sx={{ 
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Banks List */}
      <Box sx={{ mt: 2 }}>
        {[
          { id: 1, name: 'Bank 1', holderName: 'Mr.Darvin', accountNumber: '123123', ifsc: 'KUH23423', type: 'Savings' },
          { id: 2, name: 'Bank 2', holderName: 'Mr.Mark', accountNumber: '345345', ifsc: 'HYTU322', type: 'Current' },
        ].map((bank) => (
          <Card
            key={bank.id}
            sx={{
              mb: 2,
              cursor: 'pointer',
              borderRadius: 2,
              border: '2px solid',
              borderColor: selectedBankId === bank.id ? 'primary.main' : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
            onClick={() => handleSelectBank(bank.id)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: selectedBankId === bank.id ? 'primary.main' : 'grey.200',
                      width: 56,
                      height: 56,
                      '& .MuiSvgIcon-root': {
                        color: selectedBankId === bank.id ? 'white' : 'grey.600'
                      }
                    }}
                  >
                    <BankIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {bank.name}
                      </Typography>
                      <Chip 
                        label={bank.type}
                        size="small"
                        sx={{ 
                          ...getChipStyles(bank.type),
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {bank.holderName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {formatAccountNumber(bank.accountNumber)}
                      </Typography>
                      <Tooltip title="Copy Account Number">
                        <IconButton size="small">
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                
                {selectedBankId === bank.id && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body2" color="primary.main" fontWeight={500}>
                      Selected
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box 
                sx={{ 
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'grey.100',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  IFSC: <span style={{ fontFamily: 'monospace' }}>{bank.ifsc}</span>
                </Typography>
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                    '&:hover': { bgcolor: 'primary.light' }
                  }}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BankSelection;