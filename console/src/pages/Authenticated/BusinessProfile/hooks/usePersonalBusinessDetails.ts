import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"
import { Business } from "@types/db"

type ApiResponse = {
    business: Business
}

const fetchBusinessDetails = (userId: string) => {
    return fetchData<ApiResponse>(ApiRoutes.business.personal, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
}

type props = {
    userId: string;
}
export const usePersonalBusinessDetails = ({userId}:props) => {
    const query = useQuery({
        queryKey: [AppQueries.businessPersonal, userId],
        queryFn: () => {
            return  fetchBusinessDetails(userId)
        },
        refetchOnWindowFocus: false,
    })
    
    return query;

}