import {
    Box,
    Typography,
    Switch,
  } from '@mui/material';
  
  import {
    LocalOffer as DiscountIcon,
  } from '@mui/icons-material';

  type props = {
    discountApplied: boolean;
    handleToggleDiscount: (value:boolean) => void; 
  }

export const DiscountHeader = ({discountApplied, handleToggleDiscount}:props) => {
    return (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: discountApplied ? 3 : 2,
            pb: discountApplied ? 2 : 0,
            borderBottom: discountApplied ? '1px solid' : 'none',
            borderColor: 'rgba(194, 24, 91, 0.1)'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 2,
              bgcolor: discountApplied ? 'primary.main' : 'rgba(194, 24, 91, 0.08)',
              color: discountApplied ? 'white' : 'primary.main',
              transition: 'all 0.3s ease',
              transform: discountApplied ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <DiscountIcon />
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: discountApplied ? 'primary.main' : 'text.primary',
                fontWeight: 600,
                mb: 0.5
              }}
            >
              Discount Options
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Apply discounts to adjust the final price
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Switch
              checked={discountApplied}
              onChange={(e) => handleToggleDiscount(e.target.checked)}
              color="primary"
            />
          </Box>
        </Box>
    )
}