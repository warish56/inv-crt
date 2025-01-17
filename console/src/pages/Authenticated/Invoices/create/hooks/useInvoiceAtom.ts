
import { useAtomValue } from "jotai"
import { invoiceAtom } from "../atoms/invoice";


export const useInvoiceAtom = () => {
    const data = useAtomValue(invoiceAtom);
    return {
        invoiceData: data
    }
}