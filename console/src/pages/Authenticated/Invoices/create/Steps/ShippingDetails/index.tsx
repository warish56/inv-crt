import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';

export const ShippingDetailsStep = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>Shipping Information</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Shipping Address"
            multiline
            rows={3}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Shipping Method"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Shipping Cost"
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
