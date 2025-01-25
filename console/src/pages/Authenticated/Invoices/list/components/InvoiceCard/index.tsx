
import { 
    Box,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Stack,
    Button,
  } from '@mui/material';
  import { STATUS_OPTIONS } from '../../constants';
  import {  PartialInvoice } from '@types/db';
import { Header } from './Header';
import { useNavigate } from 'react-router';
import { useModifyStatus } from '../../hooks/useModifyStatus';
import { useSnackbar } from '@hooks/useSnackbar';
import { InvoiceStatus } from '@types/tax';
import { formatCurrency } from '@utils/common';
import dayjs from 'dayjs';
import { useDeleteInvoice } from '../../hooks/useDeleteInvoice';

  type props = {
      invoice: PartialInvoice
  }
  

export const InvoiceCard = ({invoice}:props) => {
    const navigate = useNavigate();
    const mutation = useModifyStatus();
    const deleteMutation = useDeleteInvoice()
    const {showSnackbar} = useSnackbar();



    const handleDelete = () => {
        deleteMutation.mutateAsync({invoiceId: invoice.$id}).then((response) => {
          if(response[0]?.success){
            showSnackbar({message: 'Invoice deleted successfully', type: 'succes'})
          }else{
            showSnackbar({message: 'Failed to delete invoice', type: 'error'})
          }
        });
  }

    const handleStatusChange = (status:InvoiceStatus) => {
      mutation.mutateAsync({
        invoiceId: invoice.$id,
        status
      }).then((response) => {
          if(response[0]?.success){
            showSnackbar({message: 'Status updated successfully', type: 'succes'})
          }else{
            showSnackbar({message: 'Failed to update status', type: 'error'})
          }
      })
    }

    const navigateToDetailsPage = () => {
        navigate(`/invoices/create/business?inv_id=${invoice.$id}`)
    }

    const getMessage = (status:InvoiceStatus) => {
        switch(status){
          case 'pending': {
            return `Due by ${dayjs(invoice.invoice_due_date).format('D MMMM, YYYY')}`
          }
          case 'paid': {
            return `Paid on ${dayjs(invoice.payment_date).format('D MMMM, YYYY')}`
          }
          case 'overdue': {
            return `Overdue since ${dayjs(invoice.invoice_due_date).format('D MMMM, YYYY')}`
          }
          default: return ''
        }
    }

    const currentStatus = STATUS_OPTIONS.find(opt => opt.value === invoice.status);
    const isChangingStatus = mutation.isPending;
    const isDeleting = deleteMutation.isPending;

    return (
        <Card 
        sx={{ 
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          }
        }}
      >

        <LinearProgress 
        variant={(isChangingStatus || isDeleting)? 'indeterminate': 'determinate'}
        value={currentStatus?.progress || 0}
        sx={{
            height: 4,
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
            bgcolor: `${currentStatus?.color}20`,
            '& .MuiLinearProgress-bar': {
            bgcolor: currentStatus?.color
            }
        }}
        />
  
        <CardContent sx={{ p: 2 }}>
          <Header 
          userName={invoice.customer_business_name}
          invoiceName={invoice.invoice_name || invoice.customer_business_name}
          invoiceNumber={invoice.invoice_number}
          status={invoice.status}
          onStatusChange={handleStatusChange}
          invoiceId={invoice.$id}
          isChangingStatus={isChangingStatus}
          handleDelete={handleDelete}
          />

        {/* Amount and Client */}
         <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
              {formatCurrency(invoice.total_amt || 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.customer_business_name}
            </Typography>
          </Box>
  
          {/* Due Date */}
          <Stack direction="row" sx={{
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="caption" sx={{ color: 'text.primary', display: 'block', fontStyle: 'italic', fontWeight: '600' }}>
                {getMessage(invoice.status)}
            </Typography>
            <Button variant='text' size='small' onClick={navigateToDetailsPage}>See Details</Button>
          </Stack>

        </CardContent>
      </Card>
    )
}