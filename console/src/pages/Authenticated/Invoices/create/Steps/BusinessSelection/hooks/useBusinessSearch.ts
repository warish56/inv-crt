import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Business } from "@types/db"

type ApiResponse = {
    businesses: Business[]
}

const fetchBusinessList = (userId: string, searchText:string) => {
    return fetchData<ApiResponse>(ApiRoutes.business.search, {
        method: 'POST',
        body: JSON.stringify({userId, searchText})
    })
}

type props = {
    userId: string;
    searchText: string;
}
export const useBusinessSearch = ({userId, searchText}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.businessSearch, searchText],
        queryFn: () => {
            return  fetchBusinessList(userId, searchText)
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: !!searchText,
    })
    
    return query;

}