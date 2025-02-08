import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import { Modal } from "@mui/material"
import { useLocation, useNavigate, useParams } from "react-router"
import { EmailForm } from "./Form"
import { PartialInvoice } from "@types/db"
import dayjs from "dayjs"
import { formatCurrency } from "@utils/common"
import { useState } from "react"
import { EmailPreview } from "./Preview"
import { useForm } from "@tanstack/react-form"
import CloseIcon from '@mui/icons-material/Close';
import { useSendEamil } from "./hooks/useSendMail"

type formState = {
    clientsEmail: string;
    ccEmails: string[];
    subject: string;
    message: string;
}


export const SendEmailPage = () => {
    const navigate = useNavigate();
    const {invoiceId} = useParams();
    const {state} = useLocation();
    const [previewMode , setPreviewMode] = useState(false);
    const mutation = useSendEamil();

    const invoiceData = state as PartialInvoice;

    const form = useForm<formState>({
        defaultValues:{
            clientsEmail: invoiceData.customer_business_email,
            ccEmails: [],
            subject: `[Important] Email Invoice For ${invoiceData.customer_business_name} - ${invoiceData.invoice_number}`,
            message: `
Hi ${invoiceData.customer_business_name},

Please find attached invoice ${invoiceData.invoice_number}.
`
    },
    onSubmit: ({value}) => {
        mutation.mutateAsync({
            ...value,
            invoiceId: invoiceId ?? '',
        })
    }

    })




    const togglePreviewMode = () => {
        setPreviewMode(val => !val)
    }

    const handleClose = () => {
        navigate(-1)
    }


    return (
        <Modal
        open={true}
        onClose={handleClose}
      >
        <Stack sx={{
            inset: 0,
            position: 'absolute',
            //justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
            maxHeight: '100vh',
            padding: '10px'
        }}>
            <Box sx={{
                bgcolor: 'background.default',
                padding: '30px 20px',
                borderRadius: '8px',
                width: `min(80%, 500px)`,
                position: 'relative'
            }}>
                <Stack sx={{
                    maxWidth: '90%',
                    margin: '0 auto',
                    pt: '30px',
                }}>
                    <IconButton 
                    sx={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px'
                    }}
                    onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Stack direction="row" sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '15px',
                        mb: '20px'
                    }}>       
                        <Typography variant="h3">
                            Email Invoice
                        </Typography>
                        <Button variant="text" onClick={togglePreviewMode}>{previewMode ? 'Edit' :  'Preview'}</Button>
                    </Stack>
                    {   
                    previewMode ? 
                    <EmailPreview 
                        message={form.state.values.message}
                        invoiceNumber={invoiceData.invoice_number}
                        billingDate={dayjs(invoiceData.invoice_date).format('D MMMM, YYYY')}
                        dueDate={dayjs(invoiceData.invoice_due_date).format('D MMMM, YYYY')}
                        dueAmt={formatCurrency(invoiceData.total_amt)}
                        // clientBusinessName={invoiceData.customer_business_name}
                        senderBusinessName=""
                    /> 
                    :                
                    <EmailForm 
                    onCancel={handleClose}
                    form={form}
                    isSending={mutation.isPending}
                    />
                    }
                </Stack>
            </Box>
        </Stack>
      </Modal>
    )
}