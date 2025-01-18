
import {
    Box,
    Alert,
    Collapse,
    Button,
    Typography
  } from '@mui/material';
  import {
    LocationSearching as LocationIcon
  } from '@mui/icons-material';


  type props = {
    name: string;
    onLocate: () => void;
  }
export const SelectedAlert = ({name, onLocate}:props) => {
    return (
        <Collapse in={true}>
        <Alert 
          severity="info"
          sx={{ 
            mb: 3,
            alignItems: 'center',
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <Typography variant="body2">
              Selected: <strong>{name}</strong>
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={onLocate}
              startIcon={<LocationIcon />}
              sx={{ 
                ml: 2,
                borderColor: 'grey.300',
                color: 'grey.700',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'grey.50'
                }
              }}
            >
              Locate
            </Button>
          </Box>
        </Alert>
      </Collapse>
    )
}