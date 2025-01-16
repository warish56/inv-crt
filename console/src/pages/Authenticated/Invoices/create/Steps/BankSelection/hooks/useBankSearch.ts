import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Bank } from "@types/db"

type ApiResponse = {
    banks: Bank[]
}

const fetchBanksList = (userId: string, searchText:string) => {
    return fetchData<ApiResponse>(ApiRoutes.bank.search, {
        method: 'POST',
        body: JSON.stringify({userId, searchText})
    })
}

type props = {
    userId: string;
    searchText: string;
}
export const useBankSearch = ({userId, searchText}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.bankSearch, searchText],
        queryFn: () => {
            return  fetchBanksList(userId, searchText)
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: !!searchText,
    })
    
    return query;

}