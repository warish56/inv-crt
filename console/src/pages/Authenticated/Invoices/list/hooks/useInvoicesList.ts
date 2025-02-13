import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Filters, PartialInvoice } from "@types/db"

type ApiResponse = {
    invoices: PartialInvoice[]
}

const fetchInvoicesList = (userId: string, filters:Filters) => {
    return fetchData<ApiResponse>(ApiRoutes.invoice.list, {
        method: 'POST',
        body: JSON.stringify({userId, filters})
    })
}

type props = {
    userId: string;
    filters:Filters
}
export const useInvoicesList = ({userId, filters}:props) => {
    const filtersKey = JSON.stringify(filters)
    const query = useQuery({
        queryKey: [AppQueries.invoiceList, userId, filtersKey],
        queryFn: () => {
            return  fetchInvoicesList(userId, filters)
        },
        refetchOnWindowFocus: false,
    })
    
    return query;

}