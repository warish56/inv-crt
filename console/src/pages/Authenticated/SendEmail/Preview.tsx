import React from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';

interface InvoiceReminderProps {
  message: string;
  invoiceNumber: string;
  billingDate: string;
  dueDate: string;
  dueAmt: string;
  senderBusinessName: string;
}

export const EmailPreview: React.FC<InvoiceReminderProps> = ({
  message,
  invoiceNumber,
  billingDate,
  dueDate,
  dueAmt,
  senderBusinessName,
}) => {

  const tableRowStyle = {
    py: 1.5,
    borderBottom: '2px solid',
    borderColor: 'divider',
    '&:last-child': { borderBottom: 'none' }
  };

  return (
      <Paper elevation={3} sx={{  p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>
          💰 Invoice Reminder
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, whiteSpace:'pre-wrap' }}>
         {message}
        </Typography>


        <Box sx={{ mb: 3 }}>
          {/* Invoice Number Row */}
          <Grid container sx={tableRowStyle}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Invoice No:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">{invoiceNumber}</Typography>
            </Grid>
          </Grid>

          {/* Invoice Date Row */}
          <Grid container sx={tableRowStyle}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Invoice Date:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>24 January, 2025</Typography>
            </Grid>
          </Grid>

          {/* Billed To Row */}
          <Grid container sx={tableRowStyle}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Billed To:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{billingDate}</Typography>
            </Grid>
          </Grid>

          {/* Due Date Row */}
          <Grid container sx={tableRowStyle}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Due Date:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{dueDate}</Typography>
            </Grid>
          </Grid>

          {/* Due Amount Row */}
          <Grid container sx={{ py: 1.5 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Due Amount:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="primary.main" fontSize={18} fontWeight="bold">
                {dueAmt}
              </Typography>
            </Grid>
          </Grid>
        </Box>


        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          Thank you for your business. 🙏
        </Typography>

        <Box sx={{ borderTop: '2px solid', borderColor: 'divider', pt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Best regards,<br />
            <Typography component="span" color="primary.main" fontWeight="bold">
              {senderBusinessName}
            </Typography>
          </Typography>
        </Box>
      </Paper>
  );
};


