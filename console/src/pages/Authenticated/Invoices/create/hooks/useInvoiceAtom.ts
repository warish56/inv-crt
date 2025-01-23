
import { useAtomValue } from "jotai"
import { invoiceAtom } from "../atoms/invoice";
import { useTaxManager } from "./useTaxManager";


export const useInvoiceAtom = () => {
    const data = useAtomValue(invoiceAtom);
    const taxData = useTaxManager()

    const getInvoicePayloadForServer = () => {
        const {selectedDetails, shippingDetails, extraDetails, billingDetails} = data
        return {
            invoiceName: extraDetails.invoiceName,
            bankId: selectedDetails.selectedBankId,
            businessId: selectedDetails.selectedBusinessId,
            customerId: selectedDetails.selectedCustomerId,
            invoiceNumber: extraDetails.invoiceId,
            invoiceTotalAmount: Number(taxData.totalAmount),
            invoiceDate:  new Date(extraDetails.invoiceDate).toISOString(),
            invoiceDueDate: new Date(extraDetails.dueDate).toISOString(),
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