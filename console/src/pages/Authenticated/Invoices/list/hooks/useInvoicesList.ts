import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { PartialInvoice } from "@types/db"

type ApiResponse = {
    invoices: PartialInvoice[]
}

const fetchInvoicesList = (userId: string) => {
    return fetchData<ApiResponse>(ApiRoutes.invoice.list, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
}

type props = {
    userId: string;
}
export const useInvoicesList = ({userId}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.invoiceList, userId],
        queryFn: () => {
            return  fetchInvoicesList(userId)
        },
        refetchOnWindowFocus: false,
    })
    
    return query;

}