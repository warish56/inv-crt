
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
  Receipt as ReceiptIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { useStepsStatusTracker } from '../../hooks/useStepsStatusTracker';
import { Step as StepType } from '../../types/common';
import { useAppNavigation } from '@hooks/useAppNavigation';


const steps:StepType[] = [
    {
      id: 'business_selection',
      label: 'Select Business',
      description: 'Choose existing or add new business',
      icon: <BusinessIcon />,
      optional: false,
      path: '/invoices/create/business'
    },

    {
      id: 'customer_selection',
      label: 'Select Customer',
      description: 'Choose existing or add new customer',
      icon: <PersonIcon />,
      optional: false,
       path: '/invoices/create/customer'
    },
    {
      id: 'shipping_details',
      label: 'Shipping Details',
      description: 'Add shipping information',
      icon: <ShippingIcon />,
      optional: true,
       path: '/invoices/create/shipping'
    },
    {
      id: 'service_addition',
      label: 'Add Services',
      description: 'Add products or services to invoice',
      icon: <DescriptionIcon />,
      optional: false,
       path: '/invoices/create/services'
    },

    {
      id: 'bank_selection',
      label: 'Add Bank Details',
      description: 'Add banking details',
      icon: <PaymentIcon />,
      optional: true,
       path: '/invoices/create/bank'
    },
    {
      id: 'additional_details',
      label: 'Additional Details',
      description: 'Add invoice specific information',
      icon: <EditIcon />,
      optional: false,
       path: '/invoices/create/additional'
    },
    {
      id: 'preview',
      label: 'Review & Generate',
      description: 'Preview and generate invoice',
      icon: <ReceiptIcon />,
      optional: false,
       path: '/invoices/create/preview'
    }
];


type props = {}
export const StepManager = ({}:props) => {
  const {navigate} = useAppNavigation();
  const location = useLocation();
  const {isStepCompleted} = useStepsStatusTracker()

  const activeStep = steps.findIndex(item => location.pathname.includes(item.path));


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
            {steps.map((step) => {
              const completed = isStepCompleted(step.id)
              return (
                <Step key={step.id} completed={completed}>
                  <StepButton 
                    onClick={() => navigate(step.path)}
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
                          bgcolor: location.pathname.includes(step.path) ? 'primary.main' : completed ? 'success.main' : 'grey.300',
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
              )
            })}
          </Stepper>
        </CardContent>
      </Card>
    )
}