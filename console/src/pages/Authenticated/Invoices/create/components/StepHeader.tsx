import { Button, ButtonProps, CircularProgress } from "@mui/material"
import { Typography } from "@mui/material"
import { Box } from "@mui/material"

import {
    Add as AddIcon
} from '@mui/icons-material';

type props = {
    title: string;
    description: string;
    btnText?: string;
    onBtnClick?: () => void;
    loading?: boolean;
    btnProps?: ButtonProps;
    isSaveBtn?: boolean
}

export const StepHeader = ({title, description, btnText, onBtnClick, loading, btnProps, isSaveBtn}:props) => {
    return (
        <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}
      >
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
        {!!btnText && !isSaveBtn &&
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="medium"
            onClick={onBtnClick}
            {...btnProps}
          >
            {btnText}
          </Button>
        }

          {!!btnText && isSaveBtn &&
          <Button
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            variant="contained"
            size="medium"
            onClick={onBtnClick}
            disabled={loading}
            {...btnProps}
          >
            {btnText}
          </Button>
        }
      </Box>

    )
}