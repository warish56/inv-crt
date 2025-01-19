import { atom } from "jotai";
import { shippingAtom } from "./shipping";
import { billingAtom, servicesAtom } from "./services";
import { extraDetailsAtom } from "./extra";
import { selectionAtom } from "./selection";




export const invoiceAtom = atom(
    (get) => ({
        shippingDetails: get(shippingAtom),
        billingDetails: {
            ...get(billingAtom),
            services: get(servicesAtom)
        },
        extraDetails: get(extraDetailsAtom),
        selectedDetails: get(selectionAtom)
    }),
)