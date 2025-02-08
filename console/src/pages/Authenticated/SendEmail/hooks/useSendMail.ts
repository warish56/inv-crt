import { ApiRoutes } from "@constants/api";
import { useSnackbar } from "@hooks/useSnackbar";
import { fetchData } from "@services/Api";
import { useMutation } from "@tanstack/react-query"


type payload = {
    clientsEmail: string;
    ccEmails: string[];
    subject: string;
    message: string;
    invoiceId: string;
}

const sendMail = (payload:payload) => {
    return fetchData<{success:boolean}>(ApiRoutes.invoice.sendmail, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
}


export const useSendEamil = () => {
    const {showSnackbar} = useSnackbar()
    const mutation = useMutation({
        mutationFn: (payload:payload) => {
            return sendMail(payload)
        },
        onSuccess: (response) => {
            const [_, error] = response
            if(error){
                showSnackbar({message: 'Failed to send mail', type: 'error'})
            }else{
                showSnackbar({message: 'Mail sent successfully', type: 'succes'})
            }
            
        },
        onSettled: () => {

        }
    })
    return mutation
}