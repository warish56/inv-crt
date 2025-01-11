import {
  Box,
  Typography,
  Grid,
  TextField,
} from '@mui/material';


export const PaymentDetailsStep = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>Payment Information</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Payment Method"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Payment Terms"
            multiline
            rows={3}
            variant="outlined"
            placeholder="Enter payment terms and conditions..."
          />
        </Grid>
      </Grid>
    </Box>
  );
