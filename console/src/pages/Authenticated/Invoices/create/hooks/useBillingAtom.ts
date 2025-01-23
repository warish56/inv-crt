
import { useAtom } from "jotai"
import { billingAtom } from "../atoms/services"


export const useBillingAtom = () => {
    const [data,  setBillingDetails] = useAtom(billingAtom);

    const initializeBillingData = (payload: typeof data)=>{
        setBillingDetails(payload)
    } 

    const updateBillingType = (value: typeof data['supplyType']) => {
        setBillingDetails((prev) => ({
            ...prev,
            supplyType: value
        }))
    }
    

    const updateDiscount = (type: typeof data['discountType'], value: string) => {
        setBillingDetails((prev) => ({
            ...prev,
            discountType: type,
            discountValue: value
        }))
    }


    const toggleDiscount = (value: boolean) => {
        setBillingDetails((prev) => ({
            ...prev,
            discountApplied: value,
        }))
    }

    return {
        updateDiscount,
        updateBillingType,
        toggleDiscount,
        initializeBillingData,
        billingDetails: data
    }
}