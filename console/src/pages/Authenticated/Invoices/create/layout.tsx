import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { StepManager } from './Steps/StepManager';
import { StepFooter } from './Footer';
import { Outlet } from 'react-router';



export const CreateInvoiceLayout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([]);



  const handleStep = (step: number | ((prev: number) => number) ) => {
    setActiveStep(step);
  };


  const handleComplete = () => {
    setCompleted((prev) =>  {
        const newList = [...prev];
        newList[activeStep] = true;
        return newList
    });
    handleNext();
  };

  const handleNext = () => {
    handleStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    handleStep((currentStep) => currentStep - 1);
  };





  return (
    <Box sx={{ 
        p: 3 ,
        "--header-hight": '200px'
    }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: 'primary.main'
        }}
      >
        Create New Invoice
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StepManager />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{
              height: 'calc(100dvh - var(--header-hight))',
              overflow: 'auto',
              border: 'none',
              boxShadow: 'none',
              bgcolor: 'background.default',
            }}
          >
            <CardContent sx={{
              bgcolor: 'background.default',
              boxShadow: 'none',
              paddingTop: 0,
            }}>
              <Outlet />
            </CardContent>
          </Card>

          <StepFooter 
           activeStep={activeStep}
           handleBack={handleBack}
           totalSteps={6}
           handleNext={handleNext}
           handleComplete={handleComplete}
          />
        </Grid>
      </Grid>
    </Box>
  );
};