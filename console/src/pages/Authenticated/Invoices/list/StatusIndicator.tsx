import { Box } from "@mui/material";
import { STATUS_OPTIONS } from "./constants";
import { InvoiceStatus } from "@types/db";


type props = {
    status: InvoiceStatus
}

export const StatusIndicator = ({ status }:props) => {
    const statusOption = STATUS_OPTIONS.find(opt => opt.value === status);
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: `${statusOption?.color}15`,
            color: statusOption?.color,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'capitalize',
            letterSpacing: '0.5px'
          }}
        >
          {status}
        </Box>
      </Box>
    );
  };
  