
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress
} from '@mui/material';
import { STATUS_OPTIONS } from './constants';
import { StatusIndicator } from './StatusIndicator';
import {  PartialInvoice } from '@types/db';


type props = {
    invoice: PartialInvoice
}


export const InvoiceCard = ({ invoice }:props) => {  
    const getInitials = (name:string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    };
  
    const currentStatus = STATUS_OPTIONS.find(opt => opt.value === invoice.status);
  
    return (
      <Card 
        sx={{ 
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          }
        }}
      >
        {/* Progress Bar */}
        <LinearProgress 
          variant="determinate" 
          value={currentStatus?.progress || 0}
          sx={{
            height: 4,
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
            bgcolor: `${currentStatus?.color}20`,
            '& .MuiLinearProgress-bar': {
              bgcolor: currentStatus?.color
            }
          }}
        />
  
        <CardContent sx={{ p: 2 }}>
          {/* Header with Avatar and Status */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 32,
                height: 32,
                fontSize: '0.875rem',
                bgcolor: 'grey.100',
                color: 'primary.main'
              }}
            >
              {getInitials(invoice.customer_business_name)}
            </Avatar>
            
            <Box sx={{ ml: 1.5, flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {invoice.invoice_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {invoice.invoice_number}
              </Typography>
            </Box>
  
            <Box 
              sx={{ 
                position: 'relative',
                cursor: 'pointer',
                '&:hover .status-menu': {
                  opacity: 1,
                  visibility: 'visible',
                  transform: 'translateY(0)'
                }
              }}
            >
              <StatusIndicator status={invoice.status} />
              
              {/* Status Menu */}
              <Box 
                className="status-menu"
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  mt: 1,
                  p: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(-10px)',
                  transition: 'all 0.2s ease-in-out',
                  zIndex: 1,
                  minWidth: '120px'
                }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <Box
                    key={option.value}
                    //onClick={() => onStatusChange(invoice.id, option.value)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.5,
                      py: 1,
                      borderRadius: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: `${option.color}10`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: option.color
                      }}
                    />
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontWeight: invoice.status === option.value ? 600 : 500,
                        color: invoice.status === option.value ? option.color : 'text.secondary'
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
  
          {/* Amount and Client */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
              ${invoice.total_amt}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.customer_business_name}
            </Typography>
          </Box>
  
          {/* Due Date */}
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            Due {new Date(invoice.invoice_due_date ?? '').toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    );
  };
