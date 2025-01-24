import {
  Box,
  Typography,
  Paper,
  Divider,
} from '@mui/material';

import {
  Receipt as ReceiptIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import { Discount } from './Discount';
import { useBillingAtom } from '../../hooks/useBillingAtom';
import { useShippingAtom } from '../../hooks/useShippingAtom';
import { useTaxManager } from '../../hooks/useTaxManager';
import { formatCurrency } from '@utils/common';


type tax = {
name: string;
amt: string;
}

const TaxGroup = ({taxes}:{taxes: tax[]}) => {
return (
  <Box>
  {taxes.map(({name, amt}, idx) => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      p: 1.5,
      ...(idx === 0 && taxes.length > 1 ? {
        borderBottom: '1px solid',
        borderColor: 'divider'
      }: {})
    }}>
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>
      <Typography variant="body2">
        {amt}
      </Typography>
    </Box>
    ))}
  </Box>
  )
}

type priceItemProps = {
title: string;
value: number|string;
type?: 'add' | 'discount' | ''
}

const PriceItem = ({title, value, type=''}:priceItemProps) => {
return (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between',
    px: 2,
    bgcolor: 'grey.50',
    borderRadius: 1
  }}>
    <Typography variant="body1" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="body1" fontWeight="medium">
      {type === 'add' && '+ '}{value}
    </Typography>
  </Box>
)
}

export const PricebreakDown = () => {

const {billingDetails} = useBillingAtom();
const {shippingData} = useShippingAtom();

const {
  totalAmount,
  totalBillTaxes,
  subTotal,
  discount,
  shippingGstValue,
} = useTaxManager()

  return(
      <Paper 
      elevation={2}
      sx={{ 
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        mt: 3
      }}
    >

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CalculateIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" color="primary.main">
          Price Breakdown
        </Typography>
      </Box>

      <Discount />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ReceiptIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" color="primary.main">
          Tax Summary
        </Typography>
      </Box>

      {/* Price Summary */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <PriceItem title='Sub Total' value={formatCurrency(subTotal)}/>

        {shippingData.method && shippingData.cost && Number(shippingData.cost) > 0 &&
          <PriceItem title='Shipping cost' value={formatCurrency(shippingData.cost)} type='add'/>
        }


        {billingDetails.discountApplied && Number(billingDetails.discountValue || 0) > 0 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            px: 2,
            bgcolor: 'secondary.lighter',
            borderRadius: 1,
            color: 'secondary.dark'
          }}>
            <Typography variant="body1">
              Discount {billingDetails.discountType === 'percentage' ? `(${billingDetails.discountValue}%)` : ''}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              - {formatCurrency(discount)}
            </Typography>
          </Box>
        )}

       {/* Tax Details */}
       <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, overflow: 'hidden' }}>
          {billingDetails.supplyType  === 'intraState' && ( 
            <TaxGroup 
             taxes={[
              {name: 'SGST', amt: formatCurrency(totalBillTaxes.sgst)},
              {name: 'CGST', amt: formatCurrency(totalBillTaxes.cgst)},
              ...(shippingGstValue > 0 ? [{name: 'Shipping GST', amt: formatCurrency(shippingGstValue)}]: []),
             ]}
            />
          )}

          {billingDetails.supplyType  === 'interState' && (
            <TaxGroup 
              taxes={[
                {name: 'IGST', amt: totalBillTaxes.igst},
                ...(shippingGstValue > 0 ? [{name: 'Shipping GST', amt: formatCurrency(shippingGstValue)}]: []),
              ]}
            />
          )}

          {billingDetails.supplyType  === 'unionTerritory' && (
            <TaxGroup 
              taxes={[
              {name: 'CGST', amt: totalBillTaxes.cgst},
              {name: 'UTGST', amt: totalBillTaxes.utgst},
              ...(shippingGstValue > 0 ? [{name: 'Shipping GST', amt: formatCurrency(shippingGstValue)}]: []),
              ]}
            />
          )}
       </Box>


        {/* <PriceItem title='Taxable amount' value={taxableAmountAfterDiscount} /> */}

        <Divider sx={{ my: 1 }} />

        {/* Total Amount */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 1
        }}>
          <Typography variant="h6">
            Total Amount
          </Typography>
          <Typography variant="h6">
            {formatCurrency(totalAmount)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}