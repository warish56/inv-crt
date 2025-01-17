import { atom } from "jotai";


type Service = {
    id: string;
    type: 'product' | 'service';
    name: string;
    description: string;
    code: string;
    price: number;
    gst: number;
}

export const servicesAtom = atom<Service[]>([])

type Billing = {
    supplyType: 'intraState' | 'interState' | 'unionTerritory'| '';
    discountType: 'percentage'| 'fixed' | '';
    discountValue: number;
    services: Service[];
}

export const billingAtom = atom<Billing>({
    supplyType: '',
    discountType: '',
    discountValue: 0,
    services: []
})