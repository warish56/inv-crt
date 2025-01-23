import { 
  Box,
  BoxProps,
  Typography,
} from '@mui/material';
import { STATUS_OPTIONS } from '../../constants';
import { InvoiceStatus } from '@types/tax';

type optionProps = {
  status: InvoiceStatus,
  onStatusChange: (status: InvoiceStatus) => void; 
} & typeof STATUS_OPTIONS[0]

const StatusOption = ({color, value, label, status, onStatusChange}:optionProps) => {
const isCurrentStatus = value === status;

return (
  <Box
  onClick={() => !isCurrentStatus && onStatusChange(value as InvoiceStatus)}
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: 2,
    py: 1,
    borderRadius: 1,
    cursor: isCurrentStatus ? 'default' : 'pointer',
    transition: 'all 0.2s ease',
    bgcolor: isCurrentStatus ? `${color}20` : 'transparent',
    '&:hover': {
      bgcolor: !isCurrentStatus ? `${color}10` : undefined,
    }
  }}
>
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      bgcolor: color,
      opacity: isCurrentStatus ? 1 : 0.5
    }}
  />
  <Typography 
    variant="body2"
    sx={{ 
      fontWeight: isCurrentStatus ? 700 : 500,
      color: isCurrentStatus ? color : 'text.secondary',
      transition: 'all 0.2s ease'
    }}
  >
    {label}
  </Typography>
</Box>
)
}

type props = {
currentStatus: InvoiceStatus;
onStatusChange: (status: InvoiceStatus) => void; 
containerProps?: BoxProps;
}
export const InvoiceStatusOptions = ({currentStatus, containerProps, onStatusChange}:props) => {
  return (
      <Box 
      {...containerProps}
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        mt: 1,
        p: 0.5,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)',
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(-10px)',
        transition: 'all 0.2s ease-in-out',
        zIndex: 1,
        minWidth: '160px',
        ...(containerProps?.sx ?? {}),
      }
    }
    >
      {STATUS_OPTIONS.map((option) => (
          <StatusOption 
          {...option} 
          status={currentStatus} 
          onStatusChange={onStatusChange}
          key={option.value} 
          />
      ))}
    </Box>
  )
}