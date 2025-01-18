import {
  Box,
  Typography,
  Avatar,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  CheckCircle as CheckCircleIcon,
  ContentCopy as CopyIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

  type props = {
    id: string;
    bankName: string;
    accountNumber: string;
    holderName: string | undefined;
    ifscCode: string | undefined;
    accountType: 'current' | 'savings';
    selected: boolean;
    onCardClick: (bankId:string) => void;
    onEditBank: (bankId: string) => void;
  }

export const BankCard = ({
    selected, 
    onCardClick, 
    id,
    bankName,
    holderName,
    ifscCode,
    accountType,
    accountNumber,
    onEditBank
}:props) => {

  const formatAccountNumber = (number: string) => {
    return `••••${number?.slice(-4) || ''}`;
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


    return(
      <Card
        data-bank-id={id}  
        sx={{
          mb: 2,
          cursor: 'pointer',
          borderRadius: 2,
          border: '2px solid',
          borderColor: selected ? 'primary.main' : 'transparent',
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
                <BankIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {bankName}
                  </Typography>
                  <Chip 
                    label={accountType}
                    size="small"
                    sx={{ 
                      ...getChipStyles(accountType),
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      height: '24px'
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {holderName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {formatAccountNumber(accountNumber)}
                  </Typography>
                  <Tooltip title="Copy Account Number">
                    <IconButton size="small">
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            
            {selected&& (
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
              IFSC: <span style={{ fontFamily: 'monospace' }}>{ifscCode}</span>
            </Typography>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onEditBank(id)
              }}
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