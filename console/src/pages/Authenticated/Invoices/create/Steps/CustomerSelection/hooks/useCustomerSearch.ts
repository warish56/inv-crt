import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Customer } from "@types/db"

type ApiResponse = {
    customers: Customer[]
}

const fetchCustomersList = (userId: string, searchText:string) => {
    return fetchData<ApiResponse>(ApiRoutes.customer.search, {
        method: 'POST',
        body: JSON.stringify({userId, searchText})
    })
}

type props = {
    userId: string;
    searchText: string;
}
export const useCustomerSearch = ({userId, searchText}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.customerSearch, searchText],
        queryFn: () => {
            return  fetchCustomersList(userId, searchText)
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: !!searchText,
    })
    
    return query;

}