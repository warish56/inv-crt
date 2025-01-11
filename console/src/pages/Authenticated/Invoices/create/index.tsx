import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { CustomerSelectionStep } from './Steps/CustomerSelection';
import { ServicesProvidedStep } from './Steps/ServicesProvidedStep';
import { ShippingDetailsStep } from './Steps/ShippingDetails';
import { PaymentDetailsStep } from './Steps/PaymentDetails';
import { AdditionalDetailsStep } from './Steps/AdditionalDetails';
import { InvoicePreview } from './Preview';
import { StepManager } from './Steps/StepManager';
import { StepFooter } from './Footer';
import { ClientDetailsStep } from './CreationOrUpdatationForms/ClientDetails';
import { ServiceDetails } from './CreationOrUpdatationForms/ServiceDetails';



export const CreateInvoicePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(-1);
  const [completed, setCompleted] = useState<boolean[]>([]);



  const handleStep = (step: number | ((prev: number) => number) ) => {
    handleSubStepChange(-1);
    setActiveStep(step);
  };

  const handleSubStepChange = (step:number) => {
    setActiveSubStep(step);
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


  const renderSubStep = (step: number) => {
        switch(step){
            case 0: 
                return <ClientDetailsStep />;
            case 1: 
                return <ServiceDetails />;
            default:
                return null;
        }
  }


  const renderStepContent = (step:number) => {
    switch (step) {
      case 0:
        return <CustomerSelectionStep onAddCustomer={() => handleSubStepChange(0)}   selectedCustomerId={1} handleSelectCustomer={() => {}}/>;
      case 1:
        return <ServicesProvidedStep services={[]} onAddService={() => handleSubStepChange(1)}   />;
      case 2:
        return <ShippingDetailsStep />;
      case 3:
        return <PaymentDetailsStep />;
      case 4:
        return <AdditionalDetailsStep />;
      case 5:
        return <InvoicePreview />;
      default:
        return null;
    }
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
          <StepManager 
            activeStep={activeStep}
            completed={completed}
            handleStepChange={handleStep}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{
              height: 'calc(100dvh - var(--header-hight))',
              overflow: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <CardContent>
              {activeSubStep > -1 ? renderSubStep(activeSubStep) : renderStepContent(activeStep)}
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

export default CreateInvoicePage;