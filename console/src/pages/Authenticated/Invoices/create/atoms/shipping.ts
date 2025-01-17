import { atom } from "jotai";


type ShippingDetail = {
    address: string;
    city: string;
    postalCode: string;
    state: string;
}

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
