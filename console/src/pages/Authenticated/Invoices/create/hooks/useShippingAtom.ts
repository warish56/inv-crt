import { useAtom } from "jotai"
import { shippingAtom } from "../atoms/shipping";


export const useShippingAtom = () => {
    const [data,  setShippingData] = useAtom(shippingAtom);

    const clearSameShippingFromAddress = () => {
        if(!data.fromDetailsSameAsSelectedBusinessDetails){
            return
        }
        setShippingData((prev) => ({
            ...prev,
            fromDetailsSameAsSelectedBusinessDetails: false,
            from: {
                address: '',
                city: '',
                postalCode: '',
                state: ''
            }
        }))
    }

    const clearSameShippingToAddress = () => {
        if(!data.toDetailsSameAsSelectedCustomerDetails){
            return
        }
        setShippingData((prev) => ({
            ...prev,
            toDetailsSameAsSelectedCustomerDetails: false,
            to: {
                address: '',
                city: '',
                postalCode: '',
                state: ''
            }
        }))
    }

    const updateShippingFromAddress = (payload: typeof data['from']) => {
        setShippingData((prev) => ({
            ...prev,
            from: {
                ...payload
            }
        }))
    }

    const updateShippingToAddress = (payload: typeof data['to']) => {
        setShippingData((prev) => ({
            ...prev,
            to: {
                ...payload
            }
        }))
    }

    const updateShippingExtraDetails = (payload: Omit<typeof data, 'from'| 'to' | 'fromDetailsSameAsSelectedBusinessDetails' | 'toDetailsSameAsSelectedCustomerDetails' >) => {
        setShippingData((prev) => ({
            ...prev,
            ...payload
        }))
    }

    const setSameAddress = (type: 'from' | 'to', value: boolean) => {
        setShippingData((prev) => ({
          ...prev,
          [ type === 'from' ? 'fromDetailsSameAsSelectedBusinessDetails': 'toDetailsSameAsSelectedCustomerDetails'] : value
        }))
      }


    return {
        updateShippingFromAddress,
        updateShippingToAddress,
        updateShippingExtraDetails,
        setSameAddress,
        clearSameShippingFromAddress,
        clearSameShippingToAddress,
        shippingData:data
    }
}