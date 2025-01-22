
import { 
    Box,
    Card,
    CardContent,
    Typography,
    LinearProgress
  } from '@mui/material';
  import { STATUS_OPTIONS } from '../../constants';
  import {  PartialInvoice } from '@types/db';
import { Header } from './Header';
  
  
  type props = {
      invoice: PartialInvoice
  }
  

export const InvoiceCard = ({invoice}:props) => {

    const currentStatus = STATUS_OPTIONS.find(opt => opt.value === invoice.status);

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
        variant="determinate" 
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
            invoiceName={invoice.invoice_name}
            invoiceNumber={invoice.invoice_number}
            status={invoice.status}
            />


        {/* Amount and Client */}
         <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
              ${invoice.total_amt || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.customer_business_name}
            </Typography>
          </Box>
  
          {/* Due Date */}
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            Due {new Date(invoice.invoice_due_date ?? '').toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    )
}