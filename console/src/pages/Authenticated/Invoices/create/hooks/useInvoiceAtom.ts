
import { useAtomValue } from "jotai"
import { invoiceAtom } from "../atoms/invoice";


export const useInvoiceAtom = () => {
    const data = useAtomValue(invoiceAtom);

    const getInvoicePayloadForServer = () => {
        const {selectedDetails, shippingDetails, extraDetails, billingDetails} = data
        return {
            bankId: selectedDetails.selectedBankId,
            businessId: selectedDetails.selectedBusinessId,
            customerId: selectedDetails.selectedCustomerId,
            invoiceNumber: extraDetails.invoiceId,
            invoiceDate:  new Date().toISOString(), //extraDetails.invoiceDate,
            invoiceDueDate: new Date().toISOString(), //extraDetails.invoiceDate,
            notes: extraDetails.notes,
            supplyType: billingDetails.supplyType,
            discountType: billingDetails.discountType,
            discountAmt: billingDetails.discountValue,
            servicesList: JSON.stringify(billingDetails.services),
            shippingFromDetails: JSON.stringify(shippingDetails.from),
            shippingToDetails: JSON.stringify(shippingDetails.to),
            shippingMethod: shippingDetails.method,
            shippingAmt: shippingDetails.cost,
        }
    }
    return {
        invoiceData: data,
        getInvoicePayloadForServer
    }
}