
import {
  Box,
  Stepper,
  Step,
  Card,
  CardContent,
  Typography,
  Avatar,
  StepButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';


const steps = [
    {
      label: 'Select Customer',
      description: 'Choose existing or add new customer',
      icon: <PersonIcon />,
      optional: false
    },

    {
      label: 'Add Services',
      description: 'Add products or services to invoice',
      icon: <DescriptionIcon />,
      optional: false
    },
    {
      label: 'Shipping Details',
      description: 'Add shipping information',
      icon: <ShippingIcon />,
      optional: true
    },
    {
      label: 'Payment Terms',
      description: 'Set payment method and terms',
      icon: <PaymentIcon />,
      optional: true
    },
    {
      label: 'Additional Details',
      description: 'Add invoice specific information',
      icon: <EditIcon />,
      optional: false
    },
    {
      label: 'Review & Generate',
      description: 'Preview and generate invoice',
      icon: <ReceiptIcon />,
      optional: false
    }
];


type props = {
    activeStep: number;
    completed: boolean[];
    handleStepChange: (index:number) => void

}
export const StepManager = ({activeStep, completed, handleStepChange}:props) => {
    return (
        <Card
        sx={{
          height: 'calc(100dvh - var(--header-hight))',
          overflow: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <CardContent>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            nonLinear
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'success.main',
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'primary.main',
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={completed[index]}>
                <StepButton 
                  onClick={() => handleStepChange(index)}
                  optional={
                    step.optional && (
                      <Typography variant="caption" color="text.secondary">
                        Optional
                      </Typography>
                    )
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: activeStep === index ? 'primary.main' : 'grey.300',
                        mr: 1,
                        width: 40,
                        height: 40
                      }}
                    >
                      {step.icon}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 500 }}>{step.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    )
}