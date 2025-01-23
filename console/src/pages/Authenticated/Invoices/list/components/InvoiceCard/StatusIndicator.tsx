import { Box, Typography } from "@mui/material";
import { STATUS_OPTIONS } from "../../constants";
import { InvoiceStatus } from "@types/tax";

type props = {
    status: InvoiceStatus;
}

export const StatusIndicator = ({ status }:props) => {
    const statusOption = STATUS_OPTIONS.find(opt => opt.value === status);
    
    return (
      <Box sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '4px',
        border: `1px solid ${statusOption?.color}22`,
        backgroundColor: `${statusOption?.color}10`,
        px: 1.5,
        py: 0.5,
      }}>
        <Typography 
          variant="caption" 
          sx={{
            color: statusOption?.color,
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          {status}
        </Typography>
      </Box>
    );
};