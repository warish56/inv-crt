import { SupplyType, Taxes } from "@types/tax";


 type calcParmas = {
    price: string;
    gstRate: string;
    supplyType: SupplyType;
 } 


 export type TaxRecordKey = Taxes | 'totalTax' | 'totalAmount' 

  // Calculate tax amounts based on price, GST rate and supply type
  export const calculateTotalTaxes = ({
    price:givenPrice,
    gstRate:givenRate,
    supplyType
  }:calcParmas) => {
    const price = parseFloat(givenPrice) || 0;
    const gstRate = parseFloat(givenRate) || 0;
    const totalGst = (price * gstRate) / 100;
    
    let taxes: Record<TaxRecordKey , number> = {
      cgst: 0,
      sgst: 0,
      igst: 0,
      utgst: 0,
      totalTax: totalGst,
      totalAmount: price + totalGst
    };

    switch (supplyType) {
      case 'intraState':
        taxes.cgst = totalGst / 2;
        taxes.sgst = totalGst / 2;
        break;
      case 'interState':
        taxes.igst = totalGst;
        break;
      case 'unionTerritory':
        taxes.cgst = totalGst / 2;
        taxes.utgst = totalGst / 2;
        break;
      default:
        break;
    }

    // Format all values to 2 decimal places
    Object.keys(taxes).forEach((key)  => {
      taxes[key as TaxRecordKey ] = Number(Number(taxes[key as TaxRecordKey]).toFixed(2));
    });

    return taxes;
  };