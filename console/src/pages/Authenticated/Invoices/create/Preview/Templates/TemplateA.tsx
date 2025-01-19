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
  TableRow,
  useTheme
} from '@mui/material';
import { useInvoiceAtom } from '../../hooks/useInvoiceAtom';
import { useBusinessList } from '../../Steps/BusinessSelection/hooks/useBusinessList';
import { useCustomersList } from '../../Steps/CustomerSelection/hooks/useCustomersList';
import { useBanksList } from '../../Steps/BankSelection/hooks/useBanksList';
import { useTaxManager } from '../../hooks/useTaxManager';

export const InvoiceTemplateA = () => {
  const theme = useTheme();
  const {invoiceData} = useInvoiceAtom();
  const {shippingDetails, billingDetails, selectedDetails, extraDetails} = invoiceData;
  const {services} = billingDetails;
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
    shippingCost
  } = useTaxManager();

  const businessData = businessResponse?.[0]?.businesses.find(business => business.$id === selectedDetails.selectedBusinessId);
  const customerData = customerResponse?.[0]?.customers.find(customer => customer.$id === selectedDetails.selectedCustomerId);
  const bankData = bankResponse?.[0]?.banks.find(bank => bank.$id === selectedDetails.selectedBankId);

  return (
    <Paper sx={{ 
      p: 6, 
      maxWidth: '210mm',
      minHeight: '297mm',
      mx: 'auto',
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: theme.shadows[3],
      '@media print': {
        boxShadow: 'none',
        margin: 0
      }
    }}>
      {/* Header */}
      <Box sx={{ mb: 6, borderBottom: `2px solid ${theme.palette.primary.main}`, pb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={6}>
            <Typography variant="h3" sx={{ 
              mb: 2, 
              color: 'primary.main', 
              fontWeight: 'bold',
              letterSpacing: '-0.5px' 
            }}>
              {businessData?.name || 'Business Name'}
            </Typography>
            {businessData?.gstin && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                GSTIN: {businessData.gstin}
              </Typography>
            )}
            {businessData?.pan && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                PAN: {businessData.pan}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>INVOICE</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Invoice No: <strong>{extraDetails.invoiceId || '---'}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Date: <strong>{extraDetails.invoiceDate || '---'}</strong>
            </Typography>
            {extraDetails.dueDate && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                Due Date: <strong>{extraDetails.dueDate || '---'}</strong>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Business Details */}
      <Grid container spacing={4} sx={{ mb: 4 }}>

        { selectedDetails.selectedBusinessId &&
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontSize: '1rem',
                fontWeight: 600,
                borderBottom: '1px solid',
                borderColor: 'grey.300',
                pb: 1
              }}>
                Bill From
              </Typography>
              {businessData && (
                <Box sx={{ pl: 1 }}>
                  <Typography variant="body1" sx={{ 
                    mb: 2,
                    fontWeight: 500,
                    lineHeight: 1.5
                  }}>
                    {businessData.address}<br />
                    {businessData.city}, {businessData.state} {businessData.postal_code}<br />
                    {businessData.country}
                  </Typography>

                  {businessData.phone && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Tel: {businessData.phone}
                    </Typography>
                  )}
                  
                  {businessData.email && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Email: {businessData.email}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        }

       { selectedDetails.selectedCustomerId &&
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontSize: '1rem',
                fontWeight: 600,
                borderBottom: '1px solid',
                borderColor: 'grey.300',
                pb: 1
              }}>
                Bill To
              </Typography>
              {customerData && (
                <Box sx={{ pl: 1 }}>
                  <Typography variant="subtitle1" sx={{ 
                    mb: 1,
                    fontWeight: 600
                  }}>
                    {customerData.business_name}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    GSTIN: {customerData.gstin}
                    {customerData.pan && <span> | PAN: {customerData.pan}</span>}
                  </Typography>

                  <Typography variant="body1" sx={{ 
                    mb: 2,
                    lineHeight: 1.5
                  }}>
                    {customerData.address}<br />
                    {customerData.city}, {customerData.state} {customerData.postal_code}<br />
                    {customerData.country}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
       }

      </Grid>

      {/* Shipping Details */}
      {(shippingDetails.from.address || shippingDetails.to.address) && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: '800' }}>Shipping Details</Typography>
          <Grid container spacing={4}>
            {shippingDetails.from.address &&
              <Grid item xs={6}>
                <Box sx={{ p: 3, bgcolor: 'grey.200', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>From:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{shippingDetails.from.address}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {shippingDetails.from.city}, {shippingDetails.from.state} {shippingDetails.from.postalCode}
                  </Typography>
                </Box>
              </Grid>
            }

            {shippingDetails.to.address &&
              <Grid item xs={6}>
                <Box sx={{ p: 3, bgcolor: 'grey.200', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>To:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{shippingDetails.to.address}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {shippingDetails.to.city}, {shippingDetails.to.state} {shippingDetails.to.postalCode}
                  </Typography>
                </Box>
              </Grid>
            }

          </Grid>
        </Box>
      )}

      {/* Items Table */}
      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>Item</TableCell>
            <TableCell sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>HSN/SAC</TableCell>
            <TableCell align="right" sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>Qty</TableCell>
            <TableCell align="right" sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>Price (₹)</TableCell>
            <TableCell align="right" sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>GST %</TableCell>
            <TableCell align="right" sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>Total (₹)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((item, index) => {
            const amount = Number(item.qty) * Number(item.price);
            const gstAmount = calculateTaxableAmountAfterGstForService(item.qty, item.price, item.gst);
            return (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell align="right">{item.qty}</TableCell>
                <TableCell align="right">{Number(item.price).toFixed(2)}</TableCell>
                <TableCell align="right">{item.gst}%</TableCell>
                <TableCell align="right">{(amount + gstAmount).toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Totals */}
      <Grid container justifyContent="flex-end" sx={{ mb: 6 }}>
        <Grid item xs={5}>
          <Box sx={{ 
            p: 3, 
            bgcolor: 'grey.50',
            borderRadius: 2,
            border: `1px solid ${theme.palette.grey[200]}`
          }}>
            <Typography variant="body1" sx={{ 
              mb: 2, 
              display: 'flex', 
              justifyContent: 'space-between'
            }}>
              <span>Subtotal:</span>
              <strong>₹{subTotal}</strong>
            </Typography>

            {shippingCost > 0 &&
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <span>Shipping:</span>
                <strong>+ ₹{shippingCost}</strong>
              </Typography>
            }

            {discount > 0 && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                color: 'success.main'
              }}>
                <span>Discount:</span>
                <strong>- ₹{discount}</strong>
              </Typography>
            )}

            {shippingGstValue > 0 && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <span>Shipping GST:</span>
                <strong>₹{shippingGstValue.toFixed(2)}</strong>
              </Typography>
            )}

            {billingDetails.supplyType === 'interState' && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <span>IGST:</span>
                <strong>₹{totalBillTaxes.igst}</strong>
              </Typography>
            )}

            {billingDetails.supplyType === 'intraState' && (
              <>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between'
                }}>
                  <span>CGST:</span>
                  <strong>₹{totalBillTaxes.cgst}</strong>
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between'
                }}>
                  <span>SGST:</span>
                  <strong>₹{totalBillTaxes.sgst}</strong>
                </Typography>
              </>
            )}

            {billingDetails.supplyType === 'unionTerritory' && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <span>UTGST:</span>
                <strong>₹{totalBillTaxes.utgst}</strong>
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              color: 'primary.main'
            }}>
              <span>Total:</span>
              <strong>₹{totalAmount}</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Bank Details */}
      {selectedDetails.selectedBankId && bankData && (
        <Box sx={{ 
          mt: 2,
          mb: 4,
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          '@media print': {
            breakInside: 'avoid'
          }
        }}>
          {/* Header */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            px: 3,
            py: 2,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            bgcolor: 'grey.50'
          }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600,
              color: 'text.primary'
            }}>
              Payment Information
            </Typography>
          </Box>

          {/* Details */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {/* Bank Name */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 1
                }}>
                  Bank Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {bankData.name}
                </Typography>
              </Grid>

              {/* Account Holder */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 1
                }}>
                  Account Holder
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {bankData.holder_name}
                </Typography>
              </Grid>

              {/* Account Number */}
              {bankData.acc_number && (
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}>
                    Account Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bankData.acc_number}
                  </Typography>
                </Grid>
              )}

              {/* IFSC Code */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 1
                }}>
                  IFSC Code
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {bankData.ifsc}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      {/* Notes */}
      {extraDetails.notes && (
        <Box sx={{ 
          mb: 4,
          p: 3,
          bgcolor: 'grey.50',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Notes</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{extraDetails.notes}</Typography>
        </Box>
      )}
    </Paper>
  );
};