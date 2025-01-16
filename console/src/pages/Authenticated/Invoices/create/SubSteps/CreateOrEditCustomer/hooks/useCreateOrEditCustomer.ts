import { ApiRoutes } from "@constants/api";
import { AppQueries } from "@constants/queries";
import { fetchData } from "@services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type customerPayload = {
    userId:string;
    businessName:string;
    email:string;
    phoneNumber:string;
    address:string;
    city:string;
    state:string;
    postalCode:string;
    country:string;
    gstin:string;
    pan:string;
    customerId?:string;
}

const createCustomer = (data:customerPayload) => {
    return fetchData(ApiRoutes.customer.create, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

const updateCustomer = (data:customerPayload) => {
    return fetchData(ApiRoutes.customer.update, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export const useCreateOrEditCustomer = (type: 'create' | 'edit') => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data:customerPayload) => {
            if(type === 'create'){
                return createCustomer(data)
            }
            return updateCustomer(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AppQueries.customerList]
            })
        },
        onSettled: () => {

        }
    })
    return mutation
}