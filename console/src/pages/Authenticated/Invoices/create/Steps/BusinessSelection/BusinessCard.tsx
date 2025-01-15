
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Chip,
  } from '@mui/material';
  import {
    Business as BusinessIcon,
    CheckCircle as CheckCircleIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    ArrowForward as ArrowForwardIcon,
    Receipt as GSTIcon
  } from '@mui/icons-material';
  

  type props = {
    id: string;
    businessName: string;
    gstin: string | undefined;
    email: string | undefined;
    address: string | undefined;
    city:string | undefined;
    state:string | undefined;
    businessTye: 'current' | 'savings';
    selected: boolean;
    onCardClick: (businessId:string) => void;
    onEditBusiness: (businessId: string) => void;
  }
export const BusinessCard = ({
    selected, 
    onCardClick, 
    id,
    businessName,
    businessTye,
    gstin,
    email,
    address,
    city,
    state,
    onEditBusiness
}:props) => {
    return(
        <Card
        sx={{
          mb: 2,
          cursor: 'pointer',
          borderRadius: 2,
          border: '2px solid',
          borderColor: selected? 'primary.main' : 'transparent',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
        onClick={() => onCardClick(id)}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: selected ? 'primary.main' : 'grey.200',
                  width: 56,
                  height: 56,
                  '& .MuiSvgIcon-root': {
                    color: selected ? 'white' : 'grey.600'
                  }
                }}
              >
                <BusinessIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {businessName}
                  </Typography>
                  <Chip 
                    label={businessTye}
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
                      {gstin}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            {selected && (
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
                {`${city}, ${state}`}
              </Typography>
            </Box>
            <IconButton 
            onClick={() => onEditBusiness(id)}
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
    )
}