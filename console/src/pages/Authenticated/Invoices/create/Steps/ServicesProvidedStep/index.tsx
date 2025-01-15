import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  InputAdornment,
  Divider,
} from '@mui/material';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  LocalOffer as DiscountIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { StepHeader } from '../../components/StepHeader';
import { useNavigate } from 'react-router';

type SupplyType = 'intraState' | 'interState' | 'unionTerritory';
type DiscountType = 'percentage' | 'amount';

type Service = {
    id: string;
    name: string;
    qty: number;
    rate: number;
    hsn: string;
}


type Props = {}

// Tax calculation helper functions
const calculateGST = (amount: number, supplyType: SupplyType) => {
  switch (supplyType) {
    case 'intraState':
      // For intraState: CGST & SGST (9% each)
      return {
        cgst: amount * 0.09,
        sgst: amount * 0.09,
        igst: 0
      };
    case 'interState':
      // For interState: IGST (18%)
      return {
        cgst: 0,
        sgst: 0,
        igst: amount * 0.18
      };
    case 'unionTerritory':
      // For Union Territory: CGST & UTGST (9% each)
      return {
        cgst: amount * 0.09,
        utgst: amount * 0.09,
        igst: 0
      };
  }
};

export const ServicesProvidedStep = ({}: Props) => {
  const [supplyType, setSupplyType] = useState<SupplyType>('intraState');
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [discountType, setDiscountType] = useState<DiscountType>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const navigate = useNavigate();

  const onAddService = () => {
    navigate('/invoices/create/services/create')
  }
  const onEditService = (serviceId:string) => {
    navigate(`/invoices/create/services/${serviceId}`)
  }

  const services = [{
    id: '1',
    name: 'Maggieee',
    qty: 2,
    rate: 1500,
    hsn: '123123',
  },
  {
    id: '2',
    name: 'Spa',
    qty: 1,
    rate: 500,
    hsn: '34534',
  }
]

  const calculateSubTotal = () => 
    services.reduce((sum, service) => sum + (service.qty * service.rate), 0);

  const calculateDiscount = (subTotal: number) => {
    if (!applyDiscount || !discountValue) return 0;
    return discountType === 'percentage' 
      ? (subTotal * discountValue) / 100 
      : discountValue;
  };

  const calculateGST = (amount: number, supplyType: SupplyType) => {
    switch (supplyType) {
      case 'intraState':
        return { cgst: amount * 0.09, sgst: amount * 0.09, igst: 0, utgst:0 };
      case 'interState':
        return { cgst: 0, sgst: 0, igst: amount * 0.18,  utgst:0  };
      case 'unionTerritory':
        return {  sgst: 0, cgst: amount * 0.09, utgst: amount * 0.09, igst: 0, };
    }
  };

  const calculateTotalWithTax = () => {
    const subTotal = calculateSubTotal();
    const discount = calculateDiscount(subTotal);
    const amountAfterDiscount = subTotal - discount;
    const taxes = calculateGST(amountAfterDiscount, supplyType);
    return amountAfterDiscount + taxes.cgst + taxes.sgst + taxes.igst + (taxes as any).utgst || 0;
  };

  return (
    <Box>

      <StepHeader 
        title='Add Product/Service'
        description='Add the neccessary services and products'
        onBtnClick={onAddService}
        btnText='Add Item'
      />


      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Supply Type</InputLabel>
        <Select
          value={supplyType}
          label="Supply Type"
          onChange={(e) => setSupplyType(e.target.value as SupplyType)}
        >
          <MenuItem value="intraState">Intra State</MenuItem>
          <MenuItem value="interState">Inter State</MenuItem>
          <MenuItem value="unionTerritory">Union Territory</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>HSN/SAC</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No items added yet. Click 'Add Item' to begin.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
                services.map((service) => {
                  const amount = service.qty * service.rate;
                  const taxes = calculateGST(amount, supplyType);
                  
                  return (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.hsn}</TableCell>
                      <TableCell align="right">{service.qty}</TableCell>
                      <TableCell align="right">₹{service.rate}</TableCell>
                      <TableCell align="right">₹{amount}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          //onClick={() => onDeleteService?.(service.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {services.length > 0 && (
        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            mt: 3
          }}
        >

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CalculateIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" color="primary.main">
              Price Breakdown
            </Typography>
          </Box>

             {/* Discount Section */}
             <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: applyDiscount ? 'primary.light' : 'grey.200',
        transition: 'all 0.3s ease',
        bgcolor: applyDiscount ? 'rgba(194, 24, 91, 0.04)' : 'background.paper',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Element */}
      {applyDiscount && (
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(194, 24, 91, 0.08) 0%, rgba(194, 24, 91, 0) 70%)',
            pointerEvents: 'none'
          }}
        />
      )}

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: applyDiscount ? 3 : 2,
          pb: applyDiscount ? 2 : 0,
          borderBottom: applyDiscount ? '1px solid' : 'none',
          borderColor: 'rgba(194, 24, 91, 0.1)'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 2,
            bgcolor: applyDiscount ? 'primary.main' : 'rgba(194, 24, 91, 0.08)',
            color: applyDiscount ? 'white' : 'primary.main',
            transition: 'all 0.3s ease',
            transform: applyDiscount ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <DiscountIcon />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: applyDiscount ? 'primary.main' : 'text.primary',
              fontWeight: 600,
              mb: 0.5
            }}
          >
            Discount Options
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Apply discounts to adjust the final price
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Switch
            checked={applyDiscount}
            onChange={(e) => setApplyDiscount(e.target.checked)}
            color="primary"
          />
        </Box>
      </Box>

      {/* Discount Form */}
      {applyDiscount && (
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
            <Select
              value={discountType}
              label="Discount Type"
              onChange={(e) => setDiscountType(e.target.value)}
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
              <MenuItem value="amount">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>Fixed Amount</Typography>
                  <Typography variant="body2" color="primary.main">(₹)</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Value"
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {discountType === 'percentage' ? '%' : '₹'}
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
        </Box>
      )}
    </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ReceiptIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" color="primary.main">
              Tax Summary
            </Typography>
          </Box>

          {/* Price Summary */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1
            }}>
              <Typography variant="body1" color="text.secondary">
                Sub Total
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                ₹{calculateSubTotal()}
              </Typography>
            </Box>

            {applyDiscount && discountValue > 0 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                p: 2,
                bgcolor: 'secondary.lighter',
                borderRadius: 1,
                color: 'secondary.dark'
              }}>
                <Typography variant="body1">
                  Discount {discountType === 'percentage' ? `(${discountValue}%)` : ''}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  - ₹{calculateDiscount(calculateSubTotal())}
                </Typography>
              </Box>
            )}

           {/* Tax Details */}
           <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, overflow: 'hidden' }}>
              {supplyType === 'intraState' && (
                <>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      CGST (9%)
                    </Typography>
                    <Typography variant="body2">
                      ₹{calculateGST(calculateSubTotal() - calculateDiscount(calculateSubTotal()), supplyType).cgst}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 2
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      SGST (9%)
                    </Typography>
                    <Typography variant="body2">
                      ₹{calculateGST(calculateSubTotal() - calculateDiscount(calculateSubTotal()), supplyType).sgst}
                    </Typography>
                  </Box>
                </>
              )}

              {supplyType === 'interState' && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  p: 1.5
                }}>
                  <Typography variant="body2" color="text.secondary">
                    IGST (18%)
                  </Typography>
                  <Typography variant="body2">
                    ₹{calculateGST(calculateSubTotal(), supplyType).igst}
                  </Typography>
                </Box>
              )}

              {supplyType === 'unionTerritory' && (
                <>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      CGST (9%)
                    </Typography>
                    <Typography variant="body2">
                      ₹{calculateGST(calculateSubTotal(), supplyType).cgst}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 1.5
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      UTGST (9%)
                    </Typography>
                    <Typography variant="body2">
                      ₹{calculateGST(calculateSubTotal(), supplyType).utgst}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Total Amount */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 1
            }}>
              <Typography variant="h6">
                Total Amount
              </Typography>
              <Typography variant="h6">
                ₹{calculateTotalWithTax()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};