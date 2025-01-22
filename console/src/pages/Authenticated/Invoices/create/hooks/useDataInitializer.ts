import { Invoice } from "@types/db";
import { useBillingAtom } from "./useBillingAtom";
import { useExtraDetailsAtom } from "./useExtraDetailsAtom";
import { useSelectionAtom } from "./useSelectionAtom";
import { useServiceAtom } from "./useServiceAtom"
import { useShippingAtom } from "./useShippingAtom";
import { initialShippingData } from "../atoms/shipping";
import { initialBillingData } from "../atoms/services";
import { initialExtraData } from "../atoms/extra";
import { initialSelectionData } from "../atoms/selection";


export const useDataInitializer = () => {
    const {initializeServices} = useServiceAtom();
    const {initializeShippingData} = useShippingAtom();
    const {initializeSelectionData} = useSelectionAtom();
    const {initializeBillingData} = useBillingAtom();
    const {initializeExtraDetails} = useExtraDetailsAtom();

    const initializeData = (invoice: Invoice) => {
        initializeServices(invoice.services_list);
        initializeShippingData({
            fromDetailsSameAsSelectedBusinessDetails: false,
            toDetailsSameAsSelectedCustomerDetails: false,
            from: invoice.from_details,
            to: invoice.to_details,
            method: invoice.shipping_method,
            cost: invoice.shipping_amt+''
        })
        initializeSelectionData({
            selectedBusinessId: invoice.business_id,
            selectedCustomerId: invoice.customer_id,
            selectedBankId: invoice.bank_id || '',
        })
        initializeBillingData({
            discountApplied: (invoice.discount_amt ?? 0) > 0,
            supplyType: invoice.supply_type,
            discountType: invoice.discount_type || '',
            discountValue: (invoice.discount_amt|| '') + '',
        })

        initializeExtraDetails({
            invoiceId: invoice.invoice_number,
            invoiceName: invoice.invoice_name,
            invoiceDate: invoice.invoice_date || '',
            dueDate: invoice.invoice_due_date || '',
            notes: invoice.notes || ''
        })
    }

    const resetData = () => {
        initializeServices([]);
        initializeShippingData(initialShippingData)
        initializeBillingData(initialBillingData);
        initializeExtraDetails(initialExtraData);
        initializeSelectionData(initialSelectionData)
    }

    return {
        initializeData,
        resetData
    }


}