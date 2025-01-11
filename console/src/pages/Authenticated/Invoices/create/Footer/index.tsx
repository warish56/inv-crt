import {
  Box,
  Button,
} from '@mui/material';


type props = {
    activeStep: number;
    handleBack: () => void;
    handleNext: () => void;
    totalSteps: number;
    handleComplete: () => void

}

export const StepFooter = ({
    activeStep, 
    handleBack, 
    totalSteps,
    handleNext,
    handleComplete
}:props) => {
    return (
        <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Back
        </Button>
        <Box>
          {activeStep !== totalSteps && (
            <Button
              variant="contained"
              onClick={handleComplete}
              sx={{
                px: 4,
                py: 1.5,
                mr: 1,
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }}
            >
              Complete Step
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === totalSteps}
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {activeStep === totalSteps ? 'Generate Invoice' : 'Next'}
          </Button>
        </Box>
      </Box>
    )
}