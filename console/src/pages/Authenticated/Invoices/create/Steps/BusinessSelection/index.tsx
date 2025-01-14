import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowForward as ArrowForwardIcon,
  Receipt as GSTIcon
} from '@mui/icons-material';
import { StepHeader } from '../../components/StepHeader';

type Props = {
  selectedBusinessId: number;
  onAddBusiness: () => void;
  handleSelectBusiness: (id: number) => void;
}

export const BusinessSelectionStep = ({
  selectedBusinessId,
  handleSelectBusiness,
  onAddBusiness
}: Props) => {
  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>

      <StepHeader 
        title='Select Business'
        description='Choose a business for your transaction'
        onBtnClick={onAddBusiness}
        btnText='New Business'
      />

      {/* Search Section */}
      <TextField
        fullWidth
        placeholder="Search business by name, GSTIN, or location..."
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

      {/* Customers List */}
      <Box sx={{ mt: 2 }}>
        {[
          { id: 1, name: 'Acme Corp', gstin: 'GSTIN001', email: 'acme@example.com', address: 'Mumbai, India', type: 'Corporate' },
          { id: 2, name: 'TechCorp', gstin: 'GSTIN002', email: 'tech@example.com', address: 'Delhi, India', type: 'Startup' },
        ].map((customer) => (
          <Card
            key={customer.id}
            sx={{
              mb: 2,
              cursor: 'pointer',
              borderRadius: 2,
              border: '2px solid',
              borderColor: selectedBusinessId === customer.id ? 'primary.main' : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
            onClick={() => handleSelectBusiness(customer.id)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: selectedBusinessId === customer.id ? 'primary.main' : 'grey.200',
                      width: 56,
                      height: 56,
                      '& .MuiSvgIcon-root': {
                        color: selectedBusinessId === customer.id ? 'white' : 'grey.600'
                      }
                    }}
                  >
                    <BusinessIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {customer.name}
                      </Typography>
                      <Chip 
                        label={customer.type}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(194, 24, 91, 0.08)',
                          color: 'primary.main',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GSTIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                          {customer.gstin}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                
                {selectedBusinessId === customer.id && (
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {customer.address}
                  </Typography>
                </Box>
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