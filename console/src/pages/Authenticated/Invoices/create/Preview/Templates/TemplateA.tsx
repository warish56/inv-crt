import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { useInvoiceAtom } from '../../hooks/useInvoiceAtom';
import { useBusinessList } from '../../Steps/BusinessSelection/hooks/useBusinessList';
import { useCustomersList } from '../../Steps/CustomerSelection/hooks/useCustomersList';
import { useBanksList } from '../../Steps/BankSelection/hooks/useBanksList';
import { useTaxManager } from '../../hooks/useTaxManager';

export const InvoiceTemplateA = ({}) => {

  const {invoiceData} = useInvoiceAtom();
  const {shippingDetails, billingDetails, selectedDetails, extraDetails} = invoiceData;
  const {services} = billingDetails
  const {data: businessResponse} = useBusinessList({userId: '1'});
  const {data: customerResponse} = useCustomersList({userId: '1'});
  const {data: bankResponse} = useBanksList({userId: '1'});
  const {
    totalAmount,
    totalBillTaxes,
    subTotal,
    calculateTaxableAmountAfterGstForService,
    discount,
    shippingGstValue,
  } = useTaxManager();


  const businessData = businessResponse?.[0]?.businesses.find(business => business.$id === selectedDetails.selectedBusinessId);
  const customerData = customerResponse?.[0]?.customers.find(customer => customer.$id === selectedDetails.selectedCustomerId);
  const bankData = bankResponse?.[0]?.banks.find(bank => bank.$id === selectedDetails.selectedBankId);

  return (
    <Paper sx={{ 
      p: 4, 
      maxWidth: '210mm',  // A4 width
      minHeight: '297mm', // A4 height
      mx: 'auto',
      bgcolor: 'background.paper',
      '@media print': {
        boxShadow: 'none',
        margin: 0
      }
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
              {businessData?.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              GSTIN: {businessData?.gstin}
            </Typography>
            {businessData?.pan && (
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                PAN: {businessData.pan}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>INVOICE</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Invoice No: {extraDetails.invoiceId}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Date: {extraDetails.invoiceDate}
            </Typography>
            {extraDetails.dueDate && (
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Due Date: {extraDetails.dueDate }
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Business Details */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Bill From:</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>{businessData?.address}</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {businessData?.city}, {businessData?.state} {businessData?.postal_code}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>{businessData?.country}</Typography>
            {businessData?.phone && (
              <Typography variant="body2" sx={{ mb: 0.5 }}>Phone: {businessData?.phone}</Typography>
            )}
            {businessData?.email && (
              <Typography variant="body2" sx={{ mb: 0.5 }}>Email: {businessData?.email}</Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Bill To:</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 'bold' }}>
              {customerData?.business_name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>GSTIN: {customerData?.gstin}</Typography>
            {customerData?.pan && (
              <Typography variant="body2" sx={{ mb: 0.5 }}>PAN: {customerData?.pan}</Typography>
            )}
            <Typography variant="body2" sx={{ mb: 0.5 }}>{customerData?.address}</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {customerData?.city}, {customerData?.state} {customerData?.postal_code}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>{customerData?.country}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Shipping Details if provided */}
      {shippingDetails && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>Shipping Details</Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>{shippingDetails.from.address}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {shippingDetails.from.city}, {shippingDetails.from.state} {shippingDetails.from.postalCode}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>{shippingDetails.to.address}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {shippingDetails.to.city}, {shippingDetails.to.state} {shippingDetails.to.postalCode}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      {/* Items Table */}
      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            <TableCell>Item</TableCell>
            <TableCell>Code</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">GST %</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((item, index) => {
            const amount = Number(item.qty) * Number(item.price);
            return(
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell align="right">{item.qty}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.gst}%</TableCell>
              <TableCell align="right">{ amount + calculateTaxableAmountAfterGstForService(item.qty, item.price, item.gst)}</TableCell>
            </TableRow>
          )
          })}
        </TableBody>
      </Table>

      {/* Totals */}
      <Grid container justifyContent="flex-end" sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="body2" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>{subTotal}</span>
            </Typography>
            {billingDetails.supplyType === 'interState' && (
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <span>IGST:</span>
                <span>{totalBillTaxes.igst}</span>
              </Typography>
            )}
            {billingDetails.supplyType === 'intraState' && (
              <>
                <Typography variant="body2" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <span>CGST:</span>
                  <span>{totalBillTaxes.cgst}</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <span>SGST:</span>
                  <span>{totalBillTaxes.sgst}</span>
                </Typography>
              </>
            )}
            {billingDetails.supplyType === 'unionTerritory' && (
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <span>UTGST:</span>
                <span>{totalBillTaxes.utgst}</span>
              </Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total:</span>
              <span>{totalAmount}</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Bank Details if provided */}
      {selectedDetails.selectedBankId && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Bank Details</Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>Bank Name: {bankData?.name}</Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>Account Holder: {bankData?.holder_name}</Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>IFSC Code: {bankData?.ifsc}</Typography>
        </Box>
      )}

      {/* Notes if provided */}
      {extraDetails.notes && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Notes</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{extraDetails.notes}</Typography>
        </Box>
      )}
    </Paper>
  );
};
