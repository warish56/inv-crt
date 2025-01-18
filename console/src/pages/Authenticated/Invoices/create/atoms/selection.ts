import { atom } from "jotai";

type ownState = {
    selectedBusinessId:string;
    selectedCustomerId:string;
    selectedBankId: string;
}

export const selectionAtom = atom<ownState>({
    selectedBusinessId: '',
    selectedCustomerId: '',
    selectedBankId: '',
})