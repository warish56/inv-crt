import {
    Box,
    Paper,
  } from '@mui/material';
import { DiscountHeader } from './DiscountHeader';
import { DiscountForm } from './DiscountForm';
import { useForm } from '@tanstack/react-form';
import { useBillingAtom } from '../../../hooks/useBillingAtom';

const ActiveBackground = () => {
    return (
        <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194, 24, 91, 0.08) 0%, rgba(194, 24, 91, 0) 70%)',
          pointerEvents: 'none'
        }}
      />
    )
}


type formState = {
  discountType: 'percentage'| 'fixed' | '';
  discountValue: string;
}

type props = {}

export const Discount = () => {
  const {toggleDiscount, updateDiscount, billingDetails} = useBillingAtom();
  const form = useForm<formState>({
    defaultValues: {
      discountType: billingDetails.discountType ?? 'percentage',
      discountValue: billingDetails.discountValue  ?? ''
    },
  })

  const onFieldBlur = () => {
        updateDiscount(form.getFieldValue('discountType'),form.getFieldValue('discountValue') )
  }

    const discountApplied = billingDetails.discountApplied;
    return (
        <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: discountApplied ? 'primary.light' : 'grey.200',
          transition: 'all 0.3s ease',
          bgcolor: discountApplied ? 'rgba(194, 24, 91, 0.04)' : 'background.paper',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        
        {discountApplied && <ActiveBackground />}
        <DiscountHeader 
        discountApplied={discountApplied}
        handleToggleDiscount={toggleDiscount}
        />
        {discountApplied && <DiscountForm onFieldBlur={onFieldBlur} form={form}/>}
        </Paper>
    )
}