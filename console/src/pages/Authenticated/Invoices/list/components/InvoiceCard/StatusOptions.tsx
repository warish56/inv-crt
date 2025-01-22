
import { 
    Box,
    BoxProps,
    Typography,
  } from '@mui/material';
  import { STATUS_OPTIONS } from '../../constants';
import { InvoiceStatus } from '@types/tax';

  type optionProps = {
    status: InvoiceStatus
  } & typeof STATUS_OPTIONS[0]

const StatusOption = ({color, value, label, status}:optionProps) => {
  return (
    <Box
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
        bgcolor: `${color}10`
      }
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: color
      }}
    />
    <Typography 
      variant="body2"
      sx={{ 
        fontWeight: status === value ? 600 : 500,
        color: status === value ? color : 'text.secondary'
      }}
    >
      {label}
    </Typography>
  </Box>
  )
}


type props = {
  currentStatus: InvoiceStatus,
  containerProps?: BoxProps
}
export const InvoiceStatusOptions = ({currentStatus, containerProps}:props) => {
    return (
        <Box 
        {...containerProps}
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
          minWidth: '120px',
          ...(containerProps?.sx ?? {}),
        }
      }
      >
        {STATUS_OPTIONS.map((option) => (
            <StatusOption {...option} status={currentStatus} key={option.value} />
        ))}
      </Box>
    )
}