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
import { formatCurrency } from '@utils/common';
import dayjs from 'dayjs'
import { Bank, Business, Customer, Service, ShippingDetail } from '@types/db';
import { SupplyType } from '@types/tax';


type props = {
  businessData: Business | undefined;
  customerData: Customer | undefined;
  bankData: Bank | undefined;
  totalAmount: number;
  subTotal: number;
  discount: number;
  shippingGstValue: number;
  shippingCost: number;
  services: Service[];
  supplyType: SupplyType;
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  notes: string;
  selectedBusinessId: string;
  selectedCustomerId: string;
  selectedBankId: string;
  fromShippingDetails: ShippingDetail;
  toShippingDetails: ShippingDetail;
  calculateTaxableAmountAfterGstForService: (qty:string, price:string, gst: string) => number;
  totalBillTaxes: {
    igst: number;
    cgst: number;
    sgst: number;
    utgst: number;
  }
}

export const PlainTemplate = ({
  businessData,
  customerData,
  bankData,
  totalAmount,
  totalBillTaxes,
  subTotal,
  discount,
  shippingGstValue,
  shippingCost,
  services,
  supplyType,
  invoiceId,
  invoiceDate,
  dueDate,
  notes,
  selectedBusinessId,
  selectedCustomerId,
  selectedBankId,
  fromShippingDetails,
  toShippingDetails,
  calculateTaxableAmountAfterGstForService
}:props) => {
  const theme = useTheme();
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
        margin: 0,
        padding: '20px',
        bgcolor: 'background.default',
      }
    }}>
      {/* Header */}
      <Box sx={{ 
        mb: 6, borderBottom: `2px solid ${theme.palette.primary.main}`, pb: 3,
        '@media print':{
          marginBottom: '20px',
          pb:0
        }
      }}>
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
              Invoice No: <strong>{invoiceId || '---'}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Date: <strong>{dayjs(invoiceDate).format('DD/MM/YYYY') || '---'}</strong>
            </Typography>
            {dueDate && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                Due Date: <strong>{dayjs(dueDate).format('DD/MM/YYYY')|| '---'}</strong>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Business Details */}
      <Grid container spacing={4} sx={{ 
        mb: 4,
        '@media print':{
          marginBottom: '10px',
        }
      }}>

        {selectedBusinessId &&
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

       { selectedCustomerId &&
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
      {(fromShippingDetails.address || toShippingDetails.address) && (
        <Box sx={{ 
          mb: 6,
          '@media print':{
            marginBottom: '10px',
          }
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: '800' }}>Shipping Details</Typography>
          <Grid container spacing={4}>
            {fromShippingDetails.address &&
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 3, 
                  bgcolor: 'grey.200', 
                  borderRadius: 2,
                  '@media print':{
                    bgcolor: 'background.default',
                    padding: '5px',
                    paddingLeft: '15px'
                  }
                }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>From:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{fromShippingDetails.address}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {fromShippingDetails.city}, {fromShippingDetails.state} {fromShippingDetails.postalCode}
                  </Typography>
                </Box>
              </Grid>
            }

            {toShippingDetails.address &&
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 3, 
                  bgcolor: 'grey.200', 
                  borderRadius: 2,
                  '@media print':{
                    bgcolor: 'background.default',
                    padding: '5px',
                    paddingLeft: '15px'
                  } 
                }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>To:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{toShippingDetails.address}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {toShippingDetails.city}, {toShippingDetails.state} {toShippingDetails.postalCode}
                  </Typography>
                </Box>
              </Grid>
            }

          </Grid>
        </Box>
      )}

      {/* Items Table */}
      <Table 
      size="small"
      sx={{ 
        mb: 4,
        '@media print':{
          marginBottom: '10px',
        }
      }}>
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
                <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                <TableCell align="right">{item.gst}%</TableCell>
                <TableCell align="right">{formatCurrency(amount + gstAmount)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Totals and Bank Details */}
      <Grid container xs={12}  sx={{
         mb: 6,
         justifyContent: 'space-between',
         gap: '10px',
         '@media print':{
          marginBottom: '10px',
          justifyContent: 'space-between',
        } 
      }}>

          <Grid item xs={6} sx={{
            display: 'flex',
            '@media print':{
              display: 'flex',
            } 
          }}>
              {selectedBankId && bankData && (
                <Box sx={{ 
                  mb: 4,
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  '@media print': {
                    breakInside: 'avoid',
                    marginBottom: '5px',
                    bgcolor: 'background.default',
                  }
                }}>
                  {/* Header */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    mb: 2,
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
                    <Grid container spacing={4} sx={{
                      marginLeft: 0,
                      '& .MuiGrid-item':{
                        padding: '5px'
                      },
                      '@media print': {
                        spacing: 1,
                      }
                    }}>
                      {/* Bank Name */}
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary',
                          mb: 1,
                          '@media print': {
                            marginBottom: '5px',
                          }
                        }}>
                          Bank Name
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {bankData.name}
                        </Typography>
                      </Grid>

                      {/* Account Holder */}
                      <Grid item xs={12} >
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary',
                          mb: 1,
                          '@media print': {
                            marginBottom: '5px',
                          }
                        }}>
                          Account Holder
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {bankData.holder_name}
                        </Typography>
                      </Grid>

                      {/* Account Number */}
                      {bankData.acc_number && (
                        <Grid item xs={12} >
                          <Typography variant="body2" sx={{ 
                            color: 'text.secondary',
                            mb: 1,
                            '@media print': {
                              marginBottom: '5px',
                            }
                          }}>
                            Account Number
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {bankData.acc_number}
                          </Typography>
                        </Grid>
                      )}

                      {/* IFSC Code */}
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary',
                          mb: 1,
                          '@media print': {
                            marginBottom: '5px',
                          }
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
          </Grid>
          <Grid item xs={5}>
          <Box sx={{ 
            p: 3, 
            bgcolor: 'grey.50',
            borderRadius: 2,
            border: `1px solid ${theme.palette.grey[200]}`,
            '@media print':{
              bgcolor: 'background.default',
              border: 'none'
            } 

          }}>
            <Typography variant="body1" sx={{ 
              mb: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              '@media print':{
                marginBottom: '5px',
              } 
            }}>
              <span>Subtotal:</span>
              <strong>{formatCurrency(subTotal)}</strong>
            </Typography>

            {shippingCost > 0 &&
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                '@media print':{
                  marginBottom: '5px',
                } 
              }}>
                <span>Shipping:</span>
                <strong>+ {formatCurrency(shippingCost)}</strong>
              </Typography>
            }

            {discount > 0 && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                color: 'success.main',
                '@media print':{
                  marginBottom: '5px',
                } 
              }}>
                <span>Discount:</span>
                <strong>- {formatCurrency(discount)}</strong>
              </Typography>
            )}

            {shippingGstValue > 0 && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                '@media print':{
                  marginBottom: '5px',
                } 
              }}>
                <span>Shipping GST:</span>
                <strong>{formatCurrency(shippingGstValue)}</strong>
              </Typography>
            )}

            {supplyType === 'interState' && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                '@media print':{
                  marginBottom: '5px',
                } 
              }}>
                <span>IGST:</span>
                <strong>{formatCurrency(totalBillTaxes.igst)}</strong>
              </Typography>
            )}

            {supplyType === 'intraState' && (
              <>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  '@media print':{
                    marginBottom: '5px',
                  } 
                }}>
                  <span>CGST:</span>
                  <strong>{formatCurrency(totalBillTaxes.cgst)}</strong>
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  '@media print':{
                    marginBottom: '5px',
                  } 
                }}>
                  <span>SGST:</span>
                  <strong>{formatCurrency(totalBillTaxes.sgst)}</strong>
                </Typography>
              </>
            )}

            {supplyType === 'unionTerritory' && (
              <Typography variant="body1" sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                '@media print':{
                  marginBottom: '5px',
                } 
              }}>
                <span>UTGST:</span>
                <strong>{formatCurrency(totalBillTaxes.utgst)}</strong>
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              color: 'primary.main'
            }}>
              <span>Total:</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </Typography>
          </Box>
        </Grid>

      </Grid>

      {/* Bank Details Horizontal Layout */}
      {
      // selectedBankId && bankData && (
      //   <Box sx={{ 
      //     mt: 2,
      //     mb: 4,
      //     border: `1px solid ${theme.palette.grey[300]}`,
      //     borderRadius: 2,
      //     overflow: 'hidden',
      //     bgcolor: 'background.paper',
      //     '@media print': {
      //       breakInside: 'avoid',
      //       display: 'none'
      //     }
      //   }}>
      //     {/* Header */}
      //     <Box sx={{
      //       display: 'flex',
      //       alignItems: 'center',
      //       px: 3,
      //       py: 2,
      //       borderBottom: `1px solid ${theme.palette.grey[200]}`,
      //       bgcolor: 'grey.50'
      //     }}>
      //       <Typography variant="subtitle1" sx={{ 
      //         fontWeight: 600,
      //         color: 'text.primary'
      //       }}>
      //         Payment Information
      //       </Typography>
      //     </Box>

      //     {/* Details */}
      //     <Box sx={{ p: 3 }}>
      //       <Grid container spacing={4}>
      //         {/* Bank Name */}
      //         <Grid item xs={12} sm={6} md={3}>
      //           <Typography variant="body2" sx={{ 
      //             color: 'text.secondary',
      //             mb: 1
      //           }}>
      //             Bank Name
      //           </Typography>
      //           <Typography variant="body1" sx={{ fontWeight: 500 }}>
      //             {bankData.name}
      //           </Typography>
      //         </Grid>

      //         {/* Account Holder */}
      //         <Grid item xs={12} sm={6} md={3}>
      //           <Typography variant="body2" sx={{ 
      //             color: 'text.secondary',
      //             mb: 1
      //           }}>
      //             Account Holder
      //           </Typography>
      //           <Typography variant="body1" sx={{ fontWeight: 500 }}>
      //             {bankData.holder_name}
      //           </Typography>
      //         </Grid>

      //         {/* Account Number */}
      //         {bankData.acc_number && (
      //           <Grid item xs={12} sm={6} md={3}>
      //             <Typography variant="body2" sx={{ 
      //               color: 'text.secondary',
      //               mb: 1
      //             }}>
      //               Account Number
      //             </Typography>
      //             <Typography variant="body1" sx={{ fontWeight: 500 }}>
      //               {bankData.acc_number}
      //             </Typography>
      //           </Grid>
      //         )}

      //         {/* IFSC Code */}
      //         <Grid item xs={12} sm={6} md={3}>
      //           <Typography variant="body2" sx={{ 
      //             color: 'text.secondary',
      //             mb: 1
      //           }}>
      //             IFSC Code
      //           </Typography>
      //           <Typography variant="body1" sx={{ fontWeight: 500 }}>
      //             {bankData.ifsc}
      //           </Typography>
      //         </Grid>
      //       </Grid>
      //     </Box>
      //   </Box>
      // )
      }

      {/* Notes */}
      {notes && (
        <Box sx={{ 
          mb: 4,
          p: 3,
          bgcolor: 'grey.50',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Notes</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{notes}</Typography>
        </Box>
      )}
    </Paper>
  );
};