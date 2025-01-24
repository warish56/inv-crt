import { ApiRoutes } from "@constants/api";
import { AppQueries } from "@constants/queries";
import { fetchData } from "@services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query"


type payload = {
    invoiceId: string ;
}

const deleteInvoice = (payload:payload) => {
    return fetchData<{success:boolean}>(ApiRoutes.invoice.delete, {
        method: 'DELETE',
        body: JSON.stringify({
            invoiceId: payload.invoiceId,
        })
    })
}


export const useDeleteInvoice = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload:payload) => {
            return deleteInvoice(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AppQueries.invoiceList]
            })
        },
        onSettled: () => {

        }
    })
    return mutation
}