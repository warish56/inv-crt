import { generateUniquId } from "@utils/common";
import { atom } from "jotai";


type extraDetails = {
    invoiceId: string;
    invoiceDate: string;
    invoiceName: string;
    dueDate: string;
    notes: string;
}

export const extraDetailsAtom = atom<extraDetails>({
    invoiceId: `INV-${generateUniquId()}`,
    invoiceName: '',
    invoiceDate: '',
    dueDate: '',
    notes: ''
})