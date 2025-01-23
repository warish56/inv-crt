import { ApiRoutes } from "@constants/api";
import { AppQueries } from "@constants/queries";
import { fetchData } from "@services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InvoiceStatus } from "@types/tax";


type payload = {
    invoiceId: string ;
    status: InvoiceStatus;
}

const updateStatus = (payload:payload) => {
    return fetchData<{success:boolean}>(ApiRoutes.invoice.updateStatus, {
        method: 'PUT',
        body: JSON.stringify({
            invoiceId: payload.invoiceId,
            status: payload.status
        })
    })
}


export const useModifyStatus = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload:payload) => {
            return updateStatus(payload)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [AppQueries.invoiceList]
            })
            queryClient.invalidateQueries({
                queryKey: [AppQueries.invoiceDetails, variables.invoiceId]
            })
        },
        onSettled: () => {

        }
    })
    return mutation
}