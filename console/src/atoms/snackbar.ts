import { atom } from "jotai";

type SnackbarType = 'error'|'info'|'warning'|'succes'

type state = {
    message:string;
    type: SnackbarType;
    autoHide?: number
}

export const snackbarAtom = atom<state>({
    message: '',
    type: 'info',
    autoHide: 3000
})