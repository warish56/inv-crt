import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Bank } from "@types/db"

type ApiResponse = {
    banks: Bank[]
}

const fetchBanksList = (userId: string) => {
    return fetchData<ApiResponse>(ApiRoutes.bank.list, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
}

type props = {
    userId: string;
}
export const useBanksList = ({userId}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.bankList, userId],
        queryFn: () => {
            return  fetchBanksList(userId)
        },
        refetchOnWindowFocus: false,
    })
    
    return query;

}