import React from 'react';
import {
  Button,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  allStepsCompleted: boolean;
  onSave: () => void;
  isLoading: boolean;
  onSendInvoice?: () => void;
  handlePrint: () => void;
  showPrintBtn: boolean;
}

export const StepFooter = ({
  allStepsCompleted,
  onSave,
  isLoading,
  onSendInvoice,
  handlePrint,
  showPrintBtn
}: Props) => {

  if (!allStepsCompleted) {
    return null;
  }
  
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mt: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {showPrintBtn &&
        <Tooltip title="Print Invoice">
          <IconButton 
            onClick={handlePrint}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'grey.100'
              }
            }}
          >
            <PrintIcon />
          </IconButton>
        </Tooltip>
      }

      {onSendInvoice && (
        <Tooltip title="Send Invoice">
          <IconButton 
            onClick={onSendInvoice}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'grey.100'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      )}

      <Button 
        onClick={onSave} 
        disabled={isLoading} 
        variant="contained"
        startIcon={<SaveIcon />}
      >
        Save Invoice
      </Button>
    </Stack>
  );
}