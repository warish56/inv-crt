import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  InputAdornment,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';


type props = {
    selectedCustomerId: number;
    onAddCustomer: () => void;
    handleSelectCustomer: (id: number) => void
}

export const CustomerSelectionStep = ({selectedCustomerId, handleSelectCustomer, onAddCustomer}:props) => {
    return (
        <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Select Customer</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="medium"
            onClick={onAddCustomer}
          >
            New Customer
          </Button>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Search customers..."
          variant="outlined"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
  
        <Box sx={{ mt: 2 }}>
          {[
            { id: 1, name: 'Acme Corp', gstin: 'GSTIN001', email: 'acme@example.com', address: 'Mumbai, India' },
            { id: 2, name: 'TechCorp', gstin: 'GSTIN002', email: 'tech@example.com', address: 'Delhi, India' },
          ].map((customer) => (
            <Paper
              key={customer.id}
              sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: selectedCustomerId === customer.id ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: 'grey.50',
                },
              }}
              onClick={() => handleSelectCustomer(customer.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {customer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    GSTIN: {customer.gstin}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {customer.address}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    )
}