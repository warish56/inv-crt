import { ApiRoutes } from "@constants/api";
import { useSnackbar } from "@hooks/useSnackbar";
import { fetchData } from "@services/Api";
import { useMutation } from "@tanstack/react-query"
import { downloadBlob } from "@utils/common";


type payload = {
    invoiceId: string;
    htmlContent: string;
}

const downloadInvoice = (payload:payload) => {
    const formData = new FormData();
    const blob = new Blob([payload.htmlContent], { type: 'text/html' });
    formData.append('invoiceId', payload.invoiceId);
    formData.append('file', blob);
    return fetchData<{blob:Blob}>(ApiRoutes.invoice.download, {
        method: 'POST',
        isFormData: true,
        isFileDownload: true,
        body: formData
    })
}


export const useDownloadInvoice = () => {
    const {showSnackbar} = useSnackbar()
    const mutation = useMutation({
        mutationFn: (payload:payload) => {
            return downloadInvoice(payload)
        },
        onSuccess: (response) => {
            if(!response[1]){
                const data = response[0];
                if(data?.blob){
                    downloadBlob(data?.blob);
                }
                showSnackbar({message: 'Invoice downloaded', type: 'succes'})
            }
        },
        onSettled: () => {

        }
    })
    return mutation
}