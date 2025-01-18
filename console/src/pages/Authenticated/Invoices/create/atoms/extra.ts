import { atom } from "jotai";


type extraDetails = {
    invoiceId: string;
    invoiceDate: string;
    dueDate: string;
    notes: string;
}

export const extraDetailsAtom = atom<extraDetails>({
    invoiceId: '',
    invoiceDate: '',
    dueDate: '',
    notes: ''
})