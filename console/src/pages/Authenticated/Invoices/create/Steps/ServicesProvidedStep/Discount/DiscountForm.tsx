import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
  } from '@mui/material';
import { ReactFormExtendedApi } from '@tanstack/react-form';


type DiscountType = 'percentage'| 'fixed' | '';
  
type formState = {
    discountType: DiscountType;
    discountValue: string;
  }
  
  type props = {
    form: ReactFormExtendedApi<formState, undefined>;
    onFieldBlur: () => void;
  }

export const DiscountForm = ({form, onFieldBlur}:props) => {
    return (
        <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          animation: 'fadeIn 0.4s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Discount Type</InputLabel>
          <form.Field name="discountType">
            {(field) => (
                 <Select
                 value={field.state.value}
                 label="Discount Type"
                 onChange={(e) => field.handleChange(e.target.value as DiscountType)}
                 onBlur={() => {
                  field.handleBlur();
                  onFieldBlur();
                 }}
                 sx={{
                   bgcolor: 'background.paper',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(194, 24, 91, 0.2)',
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'primary.main',
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'primary.main',
                   },
                 }}
               >
                 <MenuItem value="percentage">
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <Typography>Percentage</Typography>
                     <Typography variant="body2" color="primary.main">(%)</Typography>
                   </Box>
                 </MenuItem>
                 <MenuItem value="fixed">
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <Typography>Fixed Amount</Typography>
                     <Typography variant="body2" color="primary.main">(₹)</Typography>
                   </Box>
                 </MenuItem>
                 </Select>
            )}
          </form.Field>
         
        </FormControl>

        <form.Field name='discountValue'>
            {(field) => (
                <TextField
                    label="Value"
                    value={field.state.value}
                    onChange={(e) => {
                      const value = e.target.value
                      field.handleChange(isNaN(Number(value)) ? value.substring(0, value.length-1) : value);
                    }}
                    onBlur={() => {
                      field.handleBlur();
                      onFieldBlur();
                     }}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            {field.form.getFieldValue('discountType') === 'percentage' ? '%' : '₹'}
                        </InputAdornment>
                        ),
                        sx: {
                        bgcolor: 'background.paper',
                        }
                    }}
                    sx={{ 
                        minWidth: { xs: '100%', sm: '200px' },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(194, 24, 91, 0.2)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                        }
                    }}
                />
            )}
        </form.Field>
      </Box>
    )
}
