import {
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  Numbers as NumbersIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { StepHeader } from '../../components/StepHeader';

export const AdditionalDetailsStep = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Card sx={{ 
      bgcolor: 'background.default',
      boxShadow: 'none'
    }}>
      <CardContent sx={{
        p: 0
      }}>

        <StepHeader 
         title='Additional Details'
         description='Fill in the invoice details'
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Invoice Number"
              variant="outlined"
              placeholder="INV-0001"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Invoice Date"
              type="date"
              defaultValue={currentDate}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              defaultValue={currentDate}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              variant="outlined"
              placeholder="Add any additional notes, terms, or conditions..."
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};