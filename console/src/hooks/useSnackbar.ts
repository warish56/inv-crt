import { useAtom } from "jotai"
import { useRef } from "react";
import { snackbarAtom } from "@atoms/snackbar";


export const useSnackbar = () => {
    const [data, setData] = useAtom(snackbarAtom);
    const timeId = useRef<number | undefined>(undefined);

    const showSnackbar = (params:typeof data) => {
        if(timeId){
            clearTimeout(timeId.current);
        }
        const timeOut = params.autoHide || 3000;
        setData((val) => ({
            ...val,
            ...params
        }))

        timeId.current = setTimeout(() => {
            setData((val) => ({
                ...val,
                message: ''
            }))
        }, timeOut)
    }

    return {
        open: !!data.message,
        message: data.message,
        showSnackbar
    }
}