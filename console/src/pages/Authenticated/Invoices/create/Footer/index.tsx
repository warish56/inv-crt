import {
  Button,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';

type loadingState = {
  isCreatingOrEditing: boolean;
  isDownloading: boolean;
}

type Props = {
  allStepsCompleted: boolean;
  onSave: () => void;
  loaders:loadingState;
  onSendInvoice?: () => void;
  handlePrint: () => void;
  handleDownload: () => void;
  showPrintBtn: boolean;
  showDownloadBtn: boolean;
}

export const StepFooter = ({
  allStepsCompleted,
  onSave,
  loaders,
  onSendInvoice,
  handlePrint,
  handleDownload,
  showDownloadBtn,
  showPrintBtn
}: Props) => {

  if (!allStepsCompleted) {
    return null;
  }
  
  const {isCreatingOrEditing, isDownloading} = loaders
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

    {showDownloadBtn &&
        <Tooltip title="Doenload Invoice">
          <IconButton 
            disabled={isDownloading}
            onClick={handleDownload}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'grey.100'
              }
            }}
          >
            {isDownloading ? <CircularProgress color='primary' size="20px" /> : <DownloadIcon />}
          </IconButton>
        </Tooltip>
      }



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
        disabled={isCreatingOrEditing} 
        variant="contained"
        startIcon={<SaveIcon />}
      >
        Save Invoice
      </Button>
    </Stack>
  );
}