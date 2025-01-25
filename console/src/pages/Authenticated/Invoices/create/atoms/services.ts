import { Service } from "@types/db";
import { DiscountType, SupplyType } from "@types/tax";
import { atom } from "jotai";



export const servicesAtom = atom<Service[]>([])

type Billing = {
    discountApplied: boolean;
    supplyType: SupplyType;
    discountType: DiscountType;
    discountValue: string;
}


export const initialBillingData = {
    discountApplied: false,
    supplyType: 'intraState' as const,
    discountType: '' as const,
    discountValue: '',
}
export const billingAtom = atom<Billing>(initialBillingData)