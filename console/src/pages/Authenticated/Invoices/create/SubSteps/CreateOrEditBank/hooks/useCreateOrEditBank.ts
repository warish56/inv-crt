import { ApiRoutes } from "@constants/api";
import { AppQueries } from "@constants/queries";
import { fetchData } from "@services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type bankPayload = {
    userId:string;
    accountNumber:string;
    bankName:string;
    holderName:string;
    ifscCode:string;
    accountType:string;
    bankId?:string;
}

const createBank = (data:bankPayload) => {
    return fetchData(ApiRoutes.bank.create, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

const updateBank = (data:bankPayload) => {
    return fetchData(ApiRoutes.bank.update, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export const useCreateOrEditBank = (type: 'create' | 'edit') => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data:bankPayload) => {
            if(type === 'create'){
                return createBank(data)
            }
            return updateBank(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AppQueries.bankList]
            })
        },
        onSettled: () => {

        }
    })
    return mutation
}