import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Invoice } from "@types/db"

type ApiResponse = {
    invoice: Invoice
}

const fetchInvoicesList = (invoiceId: string) => {
    return fetchData<ApiResponse>(ApiRoutes.invoice.details, {
        method: 'POST',
        body: JSON.stringify({invoiceId})
    })
}

type props = {
    invoiceId: string|null;
}
export const useGetInvoiceDetails = ({invoiceId}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.invoiceDetails, invoiceId],
        queryFn: () => {
            return  fetchInvoicesList(invoiceId || '')
        },
        refetchOnWindowFocus: false,
        enabled:!!invoiceId,
    })
    
    return query;

}