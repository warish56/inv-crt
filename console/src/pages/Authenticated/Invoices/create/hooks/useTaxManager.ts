import { useMemo } from "react";
import { useInvoiceAtom } from "./useInvoiceAtom";

export const useTaxManager = () => {

    const {invoiceData} = useInvoiceAtom();
    const {billingDetails, shippingDetails:shippingData} = invoiceData;
    const {services} = billingDetails;
  
    const calculateDiscount = (subTotal: number) => {
      const {discountApplied, discountType, discountValue} = billingDetails;
      if (!discountApplied || !discountValue) return 0;
      return discountType === 'percentage' 
        ? (subTotal * Number(discountValue)) / 100 
        : Number(discountValue);
    };


    const calculateTaxableAmountAfterGstForService = (qty:string, price:string, gst: string) => {
      const quantity = Number(qty);
      const goodsPrice = Number(price);
      const taxablePrice = quantity * goodsPrice;
      const gstRate = Number(gst);
      return taxablePrice * (gstRate/100);
    }


  
  
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
        totalBillTaxes: {
          cgst: totalBillTaxes.cgst.toFixed(2), 
          igst: totalBillTaxes.igst.toFixed(2),   
          sgst: totalBillTaxes.sgst.toFixed(2),  
          utgst: totalBillTaxes.utgst.toFixed(2), 
        },
      }
    }, [allTaxes, taxableAmountAfterDiscount , billingDetails, shippingGstValue]);


    console.log({
        totalAmount,
        totalBillTaxes,
        subTotal,
        discount,
        shippingGstValue, 
        services,
        invoiceData

    })

    return {
        totalAmount: totalAmount.toFixed(2),
        totalBillTaxes,
        subTotal: subTotal.toFixed(2),
        discount: discount,
        shippingGstValue: shippingGstValue,
        shippingCost,
        calculateTaxableAmountAfterGstForService
    }
}