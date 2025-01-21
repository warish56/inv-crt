import { ShippingDetail } from "@types/db";
import { atom } from "jotai";


type ShippingData = {
    fromDetailsSameAsSelectedBusinessDetails: boolean;
    toDetailsSameAsSelectedCustomerDetails: boolean;
    from: ShippingDetail;
    to: ShippingDetail;
    method: string;
    cost: string;
}

export const shippingAtom = atom<ShippingData>({

    fromDetailsSameAsSelectedBusinessDetails: false,
    toDetailsSameAsSelectedCustomerDetails: false,

    from : {
        address: '',
        city: '',
        postalCode: '',
        state: ''
    },

    to: {
        address: '',
        city: '',
        postalCode: '',
        state: ''
    },
    
    method: '',
    cost: ''
})
