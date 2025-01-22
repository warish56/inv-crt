import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Business } from "@types/db"

type ApiResponse = {
    businesses: Business[]
}

const fetchBusinessList = (userId: string) => {
    return fetchData<ApiResponse>(ApiRoutes.business.list, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
}

type props = {
    userId: string;
}
export const useBusinessList = ({userId}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.businessList, userId],
        queryFn: () => {
            return  fetchBusinessList(userId)
        },
        refetchOnWindowFocus: false,
    })
    
    return query;

}