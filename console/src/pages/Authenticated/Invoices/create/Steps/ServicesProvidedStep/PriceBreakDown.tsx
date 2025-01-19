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
import { useServiceAtom } from '../../hooks/useServiceAtom';
import { useBillingAtom } from '../../hooks/useBillingAtom';
import { useMemo } from 'react';
import { useShippingAtom } from '../../hooks/useShippingAtom';


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
          ₹{amt}
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
        {type === 'add' && '+ '}₹{value}
      </Typography>
    </Box>
  )
}

export const PricebreakDown = () => {

  const {services} = useServiceAtom();
  const {billingDetails} = useBillingAtom();
  const {shippingData} = useShippingAtom();

  const calculateDiscount = (subTotal: number) => {
    const {discountApplied, discountType, discountValue} = billingDetails;
    if (!discountApplied || !discountValue) return 0;
    return discountType === 'percentage' 
      ? (subTotal * Number(discountValue)) / 100 
      : Number(discountValue);
  };

  const getFixedValue = (val:number)=> val.toFixed(2)


  const subTotal = useMemo(() => 
    services.reduce((sum, service) => sum + (Number(service.qty) * Number(service.price)), 0)
  , [services])


  const shippingCost = Number(shippingData.cost || 0);
  // shipping cost is be included on the total value of the bill
  const taxableAmountBeforeDiscount = subTotal+ shippingCost;
  // discount is provide on the total taxable price
  const discount = calculateDiscount(taxableAmountBeforeDiscount);
  const taxableAmountAfterDiscount = Math.max(taxableAmountBeforeDiscount - discount, 0);
  const maximumGst = services.reduce((prevValue,currService) => Math.max(prevValue, Number(currService.gst)) , 0)
  const shippingProportionalValue = (Number(shippingData.cost ?? 0)/taxableAmountBeforeDiscount)*taxableAmountAfterDiscount;
  const shippingGstValue = Math.max(shippingProportionalValue * (maximumGst/100), 0);




  // calculates all the taxes according to thr gst rates given for each item
  const allTaxes = useMemo(() =>{
    const taxes: {
      cgst: number; 
      sgst: number; 
      igst: number; 
      utgst:number; 
    }[] = [];

    services.forEach(({gst, qty, price:amount}) => {
      let data;
      const totaPrice =  Number(amount) * Number(qty);
      /**
       * Proportional value means
       * 1. item a is 20% of the total price before discounting then it should be also 20% of the total price after discounting
       */
      const proportionalValue = (totaPrice/taxableAmountBeforeDiscount)*taxableAmountAfterDiscount;
      const gstValue = proportionalValue * ((Number(gst))/100);

      switch (billingDetails.supplyType) {
        case 'intraState':
          data = { 
            cgst: Math.max(gstValue/2, 0), 
            sgst: Math.max(gstValue/2, 0), 
            igst: 0, 
            utgst:0 ,
          };
          break;
        case 'interState':
          data = { 
            cgst: 0, 
            sgst: 0, 
            igst: Math.max(gstValue,0),  
            utgst:0,
          };
          break;
        case 'unionTerritory':
          data = {  
            sgst: 0, 
            cgst: Math.max(gstValue/2), 
            utgst: Math.max(gstValue/2), 
            igst: 0, 
          };
          break;
      }
      taxes.push(data)
    })   
    
    return taxes;
},[billingDetails.supplyType, shippingData.cost , services, taxableAmountBeforeDiscount, taxableAmountAfterDiscount])





/**
 * 1. calculates the total amount after deducting discount and addign all the taxes
 * 2. calculates total CGST, SGST, IGST, UTGST tax in the current bill
 */
  const {totalAmount,  totalBillTaxes} = useMemo(() => {
    const totalBillTaxes = allTaxes.reduce((prev, currentVal)=> ({
      cgst: currentVal.cgst + prev.cgst, 
      igst: currentVal.igst + prev.igst,  
      sgst: currentVal.sgst + prev.sgst,  
      utgst: currentVal.utgst + prev.utgst,
    }), {cgst: 0, igst: 0, sgst: 0, utgst:0})

    const totalAmount =  taxableAmountAfterDiscount + totalBillTaxes.cgst + totalBillTaxes.sgst + totalBillTaxes.igst + totalBillTaxes.utgst + shippingGstValue;

    return {
      totalAmount: Math.max(totalAmount, 0),
      totalBillTaxes,
    }
  }, [allTaxes, taxableAmountAfterDiscount , billingDetails, shippingGstValue])
  
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
          <PriceItem title='Sub Total' value={subTotal}/>

          {shippingData.method && shippingData.cost && Number(shippingData.cost) > 0 &&
            <PriceItem title='Shipping cost' value={shippingData.cost} type='add'/>
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
                - ₹{calculateDiscount(taxableAmountBeforeDiscount)}
              </Typography>
            </Box>
          )}

         {/* Tax Details */}
         <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, overflow: 'hidden' }}>
            {billingDetails.supplyType  === 'intraState' && ( 
              <TaxGroup 
               taxes={[
                {name: 'SGST', amt: getFixedValue(totalBillTaxes.sgst)},
                {name: 'CGST', amt: getFixedValue(totalBillTaxes.cgst)},
                ...(shippingGstValue > 0 ? [{name: 'Shipping GST', amt: getFixedValue(shippingGstValue)}]: []),
               ]}
              />
            )}

            {billingDetails.supplyType  === 'interState' && (
              <TaxGroup 
                taxes={[
                  {name: 'IGST', amt: getFixedValue(totalBillTaxes.igst)},
                  ...(shippingGstValue > 0 ? [{name: 'Shipping GST', amt: getFixedValue(shippingGstValue)}]: []),
                ]}
              />
            )}

            {billingDetails.supplyType  === 'unionTerritory' && (
              <TaxGroup 
                taxes={[
                {name: 'CGST', amt: getFixedValue(totalBillTaxes.cgst)},
                {name: 'UTGST', amt: getFixedValue(totalBillTaxes.utgst)},
                ...(shippingGstValue > 0 ? [{name: 'Shipping GST', amt: getFixedValue(shippingGstValue)}]: []),
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
              ₹{getFixedValue(totalAmount)}
            </Typography>
          </Box>
        </Box>
      </Paper>
    )
}