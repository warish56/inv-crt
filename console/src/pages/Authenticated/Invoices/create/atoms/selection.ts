import { atom } from "jotai";

type ownState = {
    selectedBusinessId:string;
    selectedCustomerId:string;
    selectedBankId: string;
}

export const initialSelectionData = {
    selectedBusinessId: '',
    selectedCustomerId: '',
    selectedBankId: '',
}

export const selectionAtom = atom<ownState>(initialSelectionData)