import { ApiRoutes } from "@constants/api";
import { AppQueries } from "@constants/queries";
import { fetchData } from "@services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Invoice } from "@types/db";

type invoicePayload = {
    userId:string;
    bankId: string;
    businessId: string;
    customerId: string;
    invoiceTotalAmount: number;
    invoiceNumber: string;
    invoiceDate: string;
    invoiceDueDate: string;
    notes: string;
    supplyType: string;
    discountType: string;
    discountAmt: string;
    shippingFromDetails:string;
    shippingToDetails:string;
    servicesList: string;
    shippingMethod: string;
    shippingAmt: string;
    
}

const createInvoice = (data:invoicePayload) => {
    return fetchData<{invoice:Invoice}>(ApiRoutes.invoice.create, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

const updateInvoice = (data:invoicePayload) => {
    return fetchData<{invoice:Invoice}>(ApiRoutes.invoice.update, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export const useCreateOrEditInvoice = (type: 'create' | 'edit') => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data:invoicePayload) => {
            if(type === 'create'){
                return createInvoice(data)
            }
            return updateInvoice(data)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [AppQueries.invoiceList]
            })
            if(type === 'edit'){
                const data = response?.[0]?.invoice;
                queryClient.invalidateQueries({
                    queryKey: [AppQueries.invoiceDetails, data?.$id]
                })
            }
        },
        onSettled: () => {

        }
    })
    return mutation
}