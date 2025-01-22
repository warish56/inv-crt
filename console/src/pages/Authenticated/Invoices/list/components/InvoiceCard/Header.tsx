

import { 
    Box,
    Typography,
    Avatar,
  } from '@mui/material';
  import { StatusIndicator } from './StatusIndicator';
import { InvoiceStatus } from '@types/tax';
import { InvoiceStatusOptions } from './StatusOptions';
  

  const getInitials = (name:string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };


  type props = {
    userName: string;
    invoiceName: string;
    invoiceNumber: string;
    status: InvoiceStatus
  }
  
export const Header = ({userName, invoiceName, invoiceNumber, status}:props) => {
    return (
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
          {getInitials(userName || '')}
        </Avatar>
        
        <Box sx={{ ml: 1.5, flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {invoiceName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {invoiceNumber}
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
          <StatusIndicator status={status} />
            <InvoiceStatusOptions 
                containerProps={{
                    className: "status-menu"
                }}
                currentStatus={status}
            />
        </Box>
      </Box>
    )
}