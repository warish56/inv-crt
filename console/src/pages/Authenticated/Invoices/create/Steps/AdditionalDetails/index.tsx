import {
  Box,
  Typography,
  Grid,
  TextField,
} from '@mui/material';

export const AdditionalDetailsStep = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>Additional Details</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Invoice Number"

            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Invoice Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            placeholder="Add any additional notes or terms..."
          />
        </Grid>
      </Grid>
    </Box>
  );