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
import { BankSelection } from './Steps/BankSelection';
import { AdditionalDetailsStep } from './Steps/AdditionalDetails';
import { InvoicePreview } from './Preview';
import { StepManager } from './Steps/StepManager';
import { StepFooter } from './Footer';
import { ClientDetailsStep } from './SubSteps/ClientDetails';
import { ServiceDetails } from './SubSteps/ServiceDetails';
import { BankingDetails } from './SubSteps/BankDetails';



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

  const handleSubStepBack = () => {
    handleSubStepChange(-1);
  }


  const renderSubStep = (step: number) => {
        switch(step){
            case 0: 
                return <ClientDetailsStep onBack={handleSubStepBack}/>;
            case 1: 
                return <ServiceDetails onBack={handleSubStepBack}/>;
            case 2: 
              return <BankingDetails onBack={handleSubStepBack}/>;

            default:
                return null;
        }
  }


  const renderStepContent = (step:number) => {
    switch (step) {
      case 0:
        return <CustomerSelectionStep onAddCustomer={() => handleSubStepChange(0)}   selectedCustomerId={1} handleSelectCustomer={() => {}}/>;
      case 1:
        return <ShippingDetailsStep />;
      case 2:
        return <ServicesProvidedStep services={[
          {
            id: '1',
            name: 'Maggieee',
            qty: 2,
            rate: 1500,
            hsn: '123123',
          },
          {
            id: '2',
            name: 'Spa',
            qty: 1,
            rate: 500,
            hsn: '34534',
          }
        ]} 
        onAddService={() => handleSubStepChange(1)}   
        />;

      case 3:
        return <BankSelection onAddBank={() => handleSubStepChange(2)}   selectedBankId={1} handleSelectBank={() => {}}/>;
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