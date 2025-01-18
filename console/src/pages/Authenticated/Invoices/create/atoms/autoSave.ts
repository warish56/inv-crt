import { atom } from "jotai";


type state = {
    saving: boolean;
}

export const autoSaveAtom = atom<state>({
    saving: false
})