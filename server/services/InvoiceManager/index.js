

class InvoiceManager {

    constructor({
        discount_type,
        discount_amt,
        services_list,
        shipping_amt,
        supply_type
    }){

        this.invoiceData = {
            discount_amt,
            discount_type,
            services_list,
            supply_type
        };
        this.shippingData = {
            shipping_amt
        };
    }


    calculateDiscount = (subTotal) => {
        const {discount_type, discount_amt} = this.invoiceData;
        if (!discount_type || !discount_amt) return 0;
        return discount_type === 'percentage' 
          ? (subTotal * Number(discount_amt)) / 100 
          : Number(discount_amt);
    };


    calculateTaxableAmountAfterGstForService = (qty, price, gst) => {
        const quantity = Number(qty);
        const goodsPrice = Number(price);
        const taxablePrice = quantity * goodsPrice;
        const gstRate = Number(gst);
        return taxablePrice * (gstRate/100);
    }


    calculateTaxes = ({
        services,
        supplyType,
        taxableAmountBeforeDiscount,
        taxableAmountAfterDiscount
    }) => {

        const taxes = [];
      
          services.forEach(({gst, qty, price:amount}) => {
            let data;
            const totaPrice =  Number(amount || 0) * Number(qty || 0);
            /**
             * Proportional value means
             * 1. item a is 20% of the total price before discounting then it should be also 20% of the total price after discounting
             */
            const proportionalValue = (totaPrice/taxableAmountBeforeDiscount)*taxableAmountAfterDiscount;
            const gstValue = proportionalValue * ((Number(gst))/100);
      
            switch (supplyType) {
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
    }


    calculate = () => {
        const services = this.invoiceData.services_list;
        const subTotal = services.reduce((sum, service) => sum + (Number(service.qty || 0) * Number(service.price || 0)), 0)
        const shippingCost = Number(this.shippingData.shipping_amt || 0);
        // shipping cost is be included on the total value of the bill
        const taxableAmountBeforeDiscount = subTotal+ shippingCost;
        // discount is provide on the total taxable price
        const discount = this.calculateDiscount(taxableAmountBeforeDiscount);
        const taxableAmountAfterDiscount = Math.max(taxableAmountBeforeDiscount - discount, 0);
        const maximumGst = services.reduce((prevValue,currService) => Math.max(prevValue, Number(currService.gst)) , 0)
        const shippingProportionalValue = (shippingCost/taxableAmountBeforeDiscount)*taxableAmountAfterDiscount;
        const shippingGstValue = Math.max((isNaN(shippingProportionalValue) ? 0 : shippingProportionalValue ) * (maximumGst/100), 0);

        const allTaxes = this.calculateTaxes({
            services,
            supplyType: this.invoiceData.supply_type,
            taxableAmountBeforeDiscount,
            taxableAmountAfterDiscount
        })

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
                cgst: totalBillTaxes.cgst, 
                igst: totalBillTaxes.igst,   
                sgst: totalBillTaxes.sgst,  
                utgst: totalBillTaxes.utgst, 
            },
            subTotal,
            discount,
            shippingGstValue,
            shippingCost,
        }
    }
}

module.exports = {
  InvoiceManager
}