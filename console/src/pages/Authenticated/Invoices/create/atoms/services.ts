import { atom } from "jotai";


type Service = {
    id: string;
    type: 'product' | 'service';
    name: string;
    description: string;
    code: string;
    price: string;
    gst: string;
    qty: string;
}

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