

import { 
    Box,
    Typography,
    Avatar,
    Stack,
  } from '@mui/material';
  import { StatusIndicator } from './StatusIndicator';
import { InvoiceStatus } from '@types/tax';
import { InvoiceStatusOptions } from './StatusOptions';  
import { ExtraOptions } from './ExtraOptions';

  const getInitials = (name:string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };


  type props = {
    userName: string;
    onStatusChange: (status: InvoiceStatus) => void; 
    invoiceName: string;
    invoiceId: string;
    invoiceNumber: string;
    status: InvoiceStatus;
    isChangingStatus: boolean;
    children?: React.ReactNode;

    handleDelete: () => void;
  }
  
export const Header = ({
  userName,
  invoiceName,
  invoiceId,
  invoiceNumber,
  status,
  onStatusChange,
  isChangingStatus,
  handleDelete
}:props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 32,
              height: 32,
              fontSize: '0.875rem',
              bgcolor: 'primary.main',
              color: 'background.default'
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

          <Stack direction="row" sx={{
            alignItems: 'center',
            gap: '5px'
          }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  cursor: 'pointer',
                  pointerEvents: isChangingStatus? 'none' : 'all',
                  '&:hover .status-menu': {
                    opacity: 1,
                    visibility: 'visible',
                    transform: 'translateY(0)'
                  }
                }}
              >
                <StatusIndicator status={status} />
                <InvoiceStatusOptions 
                    onStatusChange={onStatusChange}
                    containerProps={{
                        className: "status-menu"
                    }}
                    currentStatus={status}
                />
              </Box>
              <ExtraOptions 
              invoiceId={invoiceId}
              handleDelete={handleDelete}
              />
          </Stack>
        </Box>
    )
}