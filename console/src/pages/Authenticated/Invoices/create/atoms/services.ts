import { Service } from "@types/db";
import { atom } from "jotai";



export const servicesAtom = atom<Service[]>([])

type Billing = {
    discountApplied: boolean;
    supplyType: 'intraState' | 'interState' | 'unionTerritory';
    discountType: 'percentage'| 'fixed' | '';
    discountValue: string;
}

export const billingAtom = atom<Billing>({
    discountApplied: false,
    supplyType: 'intraState',
    discountType: '',
    discountValue: '',
})