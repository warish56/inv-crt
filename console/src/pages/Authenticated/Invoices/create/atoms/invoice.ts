import { atom } from "jotai";
import { shippingAtom } from "./shipping";
import { billingAtom } from "./services";
import { extraDetailsAtom } from "./extra";
import { selectionAtom } from "./selection";




export const invoiceAtom = atom(
    (get) => ({
        shippingDetails: get(shippingAtom),
        billingDetails: get(billingAtom),
        extraDetails: get(extraDetailsAtom),
        selectedDetails: get(selectionAtom)
    }),
)