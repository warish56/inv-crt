import { Box, Typography } from "@mui/material";
import { STATUS_OPTIONS } from "../../constants";
import { InvoiceStatus } from "@types/tax";


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
          }}
        >
          <Typography variant="body2" sx={{
              color: statusOption?.color,
              textTransform: 'capitalize',
              letterSpacing: '0.5px'
          }}>
            {status}
          </Typography>
        </Box>
      </Box>
    );
  };
  