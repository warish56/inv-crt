import { generateUniquId } from "@utils/common";
import { atom } from "jotai";


type extraDetails = {
    invoiceId: string;
    invoiceDate: string;
    invoiceName: string;
    dueDate: string;
    notes: string;
}

export const initialExtraData = {
    invoiceId: `INV-${generateUniquId()}`,
    invoiceName: '',
    invoiceDate: '',
    dueDate: '',
    notes: ''
}

export const extraDetailsAtom = atom<extraDetails>(initialExtraData)