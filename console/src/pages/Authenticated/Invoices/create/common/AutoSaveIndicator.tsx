import { Stack, Typography, CircularProgress, Box } from '@mui/material';
import { SaveRounded as SaveIcon } from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useAutoSaveAtom } from '../hooks/useAutoSaveAtom';

const fadeInOut = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const AutoSaveIndicator = () => {
    const {autoSaving} = useAutoSaveAtom();

    if(!autoSaving){
        return null;
    }
    
    return(
        <Stack 
            direction="row" 
            sx={{
            alignItems: 'center',
            gap: 1,
            py: 0.5,
            px: 1.5,
            borderRadius: 'pill',
            bgcolor: 'grey.100',
            animation: `${fadeInOut} 2.5s ease-in-out infinite`,
            border: '1px solid',
            borderColor: 'grey.200',
            maxWidth: 'fit-content',
            }}
        >
            <SaveIcon 
            sx={{ 
                fontSize: 16,
                color: 'grey.600',
            }} 
            />
            <Typography 
            variant="body2" 
            sx={{ 
                color: 'grey.600',
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.03em',
                fontStyle: 'italic'
            }}
            >
            Auto saving
            </Typography>
            <CircularProgress
            size={14}
            thickness={5}
            sx={{
                color: 'grey.500',
            }}
            />
        </Stack>
    )
};

export default AutoSaveIndicator;