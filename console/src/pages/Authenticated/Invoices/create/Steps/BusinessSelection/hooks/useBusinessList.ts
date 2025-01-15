import { ApiRoutes } from "@constants/api"
import { AppQueries } from "@constants/queries"
import { fetchData } from "@services/Api"
import { useQuery } from "@tanstack/react-query"

type Business = {
    $id: string;
    user_id:string;
    name:string;
    email:string;
    phone:string;
    address:string;
    city:string;
    state:string;
    postal_code:string;
    country:string;
    gstin: string;
}

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
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
    
    return query;

}