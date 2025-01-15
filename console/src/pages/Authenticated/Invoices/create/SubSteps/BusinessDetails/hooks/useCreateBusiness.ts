import { ApiRoutes } from "@constants/api";
import { AppQueries } from "@constants/queries";
import { fetchData } from "@services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type businessPayload = {
    userId:string;
    name:string;
    email:string;
    phone:string;
    address:string;
    city:string;
    state:string;
    postalCode:string;
    country:string;
    gstin:string;
    pan:string;
}

const createBusiness = (data:businessPayload) => {
    return fetchData(ApiRoutes.business.create, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const useCreateBusiness = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data:businessPayload) => {
            return createBusiness(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AppQueries.businessList]
            })
        },
        onSettled: () => {

        }
    })
    return mutation
}