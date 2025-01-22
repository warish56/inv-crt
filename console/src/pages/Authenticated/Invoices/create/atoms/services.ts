import { Service } from "@types/db";
import { atom } from "jotai";



export const servicesAtom = atom<Service[]>([])

type Billing = {
    discountApplied: boolean;
    supplyType: 'intraState' | 'interState' | 'unionTerritory';
    discountType: 'percentage'| 'fixed' | '';
    discountValue: string;
}


export const initialBillingData = {
    discountApplied: false,
    supplyType: 'intraState' as const,
    discountType: '' as const,
    discountValue: '',
}
export const billingAtom = atom<Billing>(initialBillingData)