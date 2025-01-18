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
  amt: number;
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

export const PricebreakDown = () => {

    const {services} = useServiceAtom();
    const {billingDetails} = useBillingAtom();
    const {shippingData} = useShippingAtom();

  const subTotal = useMemo(() => 
    services.reduce((sum, service) => sum + (Number(service.qty) * Number(service.price)), 0)
  , [services])


  const calculateDiscount = (subTotal: number) => {
    const {discountApplied, discountType, discountValue} = billingDetails;
    if (!discountApplied || !discountValue) return 0;
    return discountType === 'percentage' 
      ? (subTotal * Number(discountValue)) / 100 
      : Number(discountValue);
  };

  const getFixedValue = (val:number)=> val.toFixed(2)




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
      switch (billingDetails.supplyType) {
        case 'intraState':
          data = { 
            cgst: totaPrice* ((Number(gst)/2)/100), 
            sgst: totaPrice * ((Number(gst)/2)/100), 
            igst: 0, 
            utgst:0 
          };
          break;
        case 'interState':
          data = { 
            cgst: 0, 
            sgst: 0, 
            igst: totaPrice * (Number(gst)/ 100),  
            utgst:0  
          };
          break;
        case 'unionTerritory':
          data = {  
            sgst: 0, 
            cgst: totaPrice * ((Number(gst)/2)/100), 
            utgst: totaPrice * ((Number(gst)/2)/100), 
            igst: 0, 
          };
          break;
      }
      taxes.push(data)
    })   
    
    return taxes;
},[billingDetails.supplyType, services])





/**
 * 1. calculates the total amount after deducting discount and addign all the taxes
 * 2. calculates total CGST, SGST, IGST, UTGST tax in the current bill
 */
  const {totalAmount,  totalBillTaxes} = useMemo(() => {
    const shippingCost = Number(shippingData.cost || 0);
    const totalCost = subTotal+ shippingCost;
    // shipping cost cannot be included while calculating the discount
    const discount = calculateDiscount(subTotal);
    const amountAfterDiscount = totalCost - discount;
    let totalAmount =  amountAfterDiscount;
    allTaxes.forEach((taxes) => {
      totalAmount +=  taxes.cgst + taxes.sgst + taxes.igst + taxes.utgst
    })

    const totalBillTaxes = allTaxes.reduce((prev, currentVal)=> ({
      cgst: currentVal.cgst + prev.cgst, 
      igst: currentVal.igst + prev.igst,  
      sgst: currentVal.sgst + prev.sgst,  
      utgst: currentVal.utgst + prev.utgst, 
    }), {cgst: 0, igst: 0, sgst: 0, utgst:0})

    return {
      totalAmount: totalAmount,
      totalBillTaxes
    }
  }, [allTaxes, subTotal, billingDetails, shippingData.cost])
  
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
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1
          }}>
            <Typography variant="body1" color="text.secondary">
              Sub Total
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              ₹{subTotal}
            </Typography>
          </Box>

          {shippingData.cost && Number(shippingData.cost) > 0 &&
           <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1
          }}>
            <Typography variant="body1" color="text.secondary">
              Shipping cost
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              ₹{shippingData.cost}
            </Typography>
          </Box>
          }

          {billingDetails.discountApplied && Number(billingDetails.discountValue || 0) > 0 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'secondary.lighter',
              borderRadius: 1,
              color: 'secondary.dark'
            }}>
              <Typography variant="body1">
                Discount {billingDetails.discountType === 'percentage' ? `(${billingDetails.discountValue}%)` : ''}
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                - ₹{calculateDiscount(subTotal)}
              </Typography>
            </Box>
          )}

         {/* Tax Details */}
         <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, overflow: 'hidden' }}>
            {billingDetails.supplyType  === 'intraState' && ( 
              <TaxGroup 
               taxes={[
                {name: 'CGST', amt: totalBillTaxes.cgst},
                {name: 'SGST', amt: totalBillTaxes.sgst}
               ]}
              />
            )}

            {billingDetails.supplyType  === 'interState' && (
              <TaxGroup 
                taxes={[
                  {name: 'IGST', amt: totalBillTaxes.igst},
                ]}
              />
            )}

            {billingDetails.supplyType  === 'unionTerritory' && (
              <TaxGroup 
                taxes={[
                {name: 'CGST', amt: totalBillTaxes.cgst},
                {name: 'UTGST', amt: totalBillTaxes.utgst}
                ]}
              />
            )}
          </Box>

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
              ₹{totalAmount}
            </Typography>
          </Box>
        </Box>
      </Paper>
    )
}