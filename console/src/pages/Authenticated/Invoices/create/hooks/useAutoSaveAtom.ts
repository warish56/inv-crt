import { useAtom } from "jotai"
import { autoSaveAtom } from "../atoms/autoSave"
import { useRef } from "react";


export const useAutoSaveAtom = () => {
    const [data, setAutoSaveDetails] = useAtom(autoSaveAtom);
    const timerRef = useRef<number| null>(null);

    const triggerAutoSave = () => {

        if(timerRef.current){
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        setAutoSaveDetails({
            saving: true
        })

        timerRef.current = setTimeout(() => {
            setAutoSaveDetails({
                saving: false
            })
        }, 1000)
    }

    return {
        triggerAutoSave,
        autoSaving: data.saving
    }
}