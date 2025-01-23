
import { useAtom } from "jotai"
import { selectionAtom } from "../atoms/selection";
import { useShippingAtom } from "./useShippingAtom";


export const useSelectionAtom = () => {
    const [data,  setSelectionDetails] = useAtom(selectionAtom);
    const {clearSameShippingFromAddress, clearSameShippingToAddress} = useShippingAtom();

    const initializeSelectionData = (payload: typeof data)=>{
        setSelectionDetails(payload)
    }

    const selectBusiness = (id:string) => {
        setSelectionDetails((prev) => {
            const newValue = prev.selectedBusinessId === id ? '' :  id;
            if(!newValue){
                clearSameShippingFromAddress();
            }
            return {
                ...prev,
                selectedBusinessId: newValue
            }
        })
    }

    const selectCustomer = (id:string) => {
        setSelectionDetails((prev) => {
            const newValue = prev.selectedCustomerId === id ? '' :  id;
            if(!newValue){
                clearSameShippingToAddress();
            }
            return {
                ...prev,
                selectedCustomerId: newValue
            }
        })
    }

    const selectBank = (id:string) => {
        setSelectionDetails((prev) => ({
            ...prev,
            selectedBankId:  prev.selectedBankId  === id ? '' : id
        }))
    }

    return {
        selectBank,
        selectBusiness,
        selectCustomer,
        initializeSelectionData,
        selectionDetails: data
    }
}