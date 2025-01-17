
import { useAtom } from "jotai"
import { billingAtom } from "../atoms/services"


export const useBillingAtom = () => {
    const [data,  setBillingDetails] = useAtom(billingAtom);

    const updateBillingType = (value: typeof data['supplyType']) => {
        setBillingDetails((prev) => ({
            ...prev,
            supplyType: value
        }))
    }

    const updateDiscount = (type: typeof data['discountType'], value: number) => {
        setBillingDetails((prev) => ({
            ...prev,
            discountType: type,
            discountValue: value
        }))
    }

    return {
        updateDiscount,
        updateBillingType,
        billingDetails: data
    }
}