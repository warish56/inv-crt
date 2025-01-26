import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Filters, PartialInvoice } from "@types/db"

type ApiResponse = {
    invoices: PartialInvoice[]
}

const fetchInvoiceList = (userId: string, searchText:string, filters:Filters) => {
    return fetchData<ApiResponse>(ApiRoutes.invoice.search, {
        method: 'POST',
        body: JSON.stringify({userId, searchText, filters})
    })
}

type props = {
    userId: string;
    searchText: string;
    filters:Filters

}
export const useInvoiceSearch = ({userId, searchText, filters}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.invoiceSearch, searchText],
        queryFn: () => {
            return  fetchInvoiceList(userId, searchText, filters)
        },
        refetchOnWindowFocus: false,
        enabled: !!searchText,
    })
    
    return query;

}