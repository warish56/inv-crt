import { useAtom } from "jotai"
import { extraDetailsAtom } from "../atoms/extra";


export const useExtraDetailsAtom = () => {
    const [data,  setExtraDetails] = useAtom(extraDetailsAtom);

    const initializeExtraDetails = (payload: typeof data) => {
        setExtraDetails(payload)
    }

    const updateExtraDetails = (payload: typeof data) => {
        setExtraDetails((prevData) => ({
            ...prevData,
            ...payload
        }))
    }

    return {
        updateExtraDetails,
        initializeExtraDetails,
        extraDetails: data
    }
}