import { Step } from "../types/common";
import { useInvoiceAtom } from "./useInvoiceAtom";


export const useStepsStatusTracker = () => {
    const {invoiceData} = useInvoiceAtom();

    const stageCompletions:Record<Step['id'], () => boolean> = {
        'business_selection': () => {
          return !!invoiceData.selectedDetails.selectedBusinessId
        },
        'customer_selection': () => {
          return !!invoiceData.selectedDetails.selectedCustomerId
        },
        'bank_selection': () => {
          return !!invoiceData.selectedDetails.selectedBankId
        },
        'service_addition': () => {
          return invoiceData.billingDetails.services.length > 0
        },
        'additional_details': () => {
          return !!invoiceData.extraDetails.invoiceDate
        },
        'shipping_details': () => {
          return !!(invoiceData.shippingDetails.from.address || invoiceData.shippingDetails.to.address)
        },
        'preview': () => false
    }
  
  
    const isStepCompleted = (id: Step['id']) => {
        return stageCompletions[id]()
    }

    const allRequiredStepsCompleted = [
        stageCompletions.business_selection(),
        stageCompletions.customer_selection(),
        stageCompletions.service_addition(),
        stageCompletions.additional_details(),
      ].every(Boolean);

      return {
        isStepCompleted,
        allRequiredStepsCompleted
      }

}