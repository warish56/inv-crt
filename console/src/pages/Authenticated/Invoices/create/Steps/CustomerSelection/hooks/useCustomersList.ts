import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Customer } from "@types/db"

type ApiResponse = {
    customers: Customer[]
}

const fetchCustomerList = (userId: string) => {
    return fetchData<ApiResponse>(ApiRoutes.customer.list, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
}

type props = {
    userId: string;
}
export const useCustomersList = ({userId}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.customerList, userId],
        queryFn: () => {
            return  fetchCustomerList(userId)
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
    
    return query;

}