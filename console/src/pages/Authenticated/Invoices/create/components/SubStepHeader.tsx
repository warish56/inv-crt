import { Button, ButtonProps, CircularProgress, IconButton } from "@mui/material"
import { Typography } from "@mui/material"
import { Box } from "@mui/material"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type props = {
    title: string;
    description: string;
    onBack: () => void;
    onActionClick?: () => void;
    actionBtnText?: string;
    loading?: boolean;
    btnProps?: ButtonProps;
}

export const SubStepHeader = ({title, description, onBack, onActionClick, actionBtnText, loading, btnProps}:props) => {
    return (
        <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 4 ,
          gap: '20px',
        }}
      >

        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
              mb: 0.5
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {!!actionBtnText &&
          <Button
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            variant="contained"
            size="medium"
            onClick={onActionClick}
            disabled={loading}
            sx={{
              marginLeft: 'auto'
            }}
            {...btnProps}
          >
            {actionBtnText}
          </Button>
        }
      </Box>

    )
}