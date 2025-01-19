
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Stack,
  } from '@mui/material';
  
  import {
    Delete as DeleteIcon,
    Edit as EditIcon
  } from '@mui/icons-material';
import { useServiceAtom } from '../../hooks/useServiceAtom';
import { useNavigate } from 'react-router';
import { useBillingAtom } from '../../hooks/useBillingAtom';
import { useTaxManager } from '../../hooks/useTaxManager';
  
export const ServicesList = () => {
    const {services, removeService} = useServiceAtom();
    const {billingDetails} = useBillingAtom();
    const {calculateTaxableAmountAfterGstForService} = useTaxManager()

    const navigate = useNavigate();

    const onEditService = (serviceId:string) => {
      navigate(`/invoices/create/services/${serviceId}`)
    }
    
    const onDeleteService = (serviceId:string) => {
        removeService(serviceId)
    }

    const getGstHeadings = () => {
      const {supplyType} = billingDetails;

      if(supplyType === 'intraState'){
        return (
          <>
            <TableCell align="left" sx={{fontWeight: 'bold'}}>CGST (₹)</TableCell>
            <TableCell align="left" sx={{fontWeight: 'bold'}}>SGST (₹)</TableCell>
          </>
        )
      }else if(supplyType === 'interState'){
        return (
          <TableCell align="left" sx={{fontWeight: 'bold'}}>IGST (₹)</TableCell>
        )
      }else{
        return(
          <>
            <TableCell align="left" sx={{fontWeight: 'bold'}}>CGST (₹)</TableCell>
            <TableCell align="left" sx={{fontWeight: 'bold'}}>UTGST (₹)</TableCell>
          </>
        )
      }
    }

    const getGstRowValues = (qty:string, price:string, gst: string) => {
      const {supplyType} = billingDetails;
      const gstRate = Number(gst);
      const value = calculateTaxableAmountAfterGstForService(qty, price, gst);

      if(supplyType === 'intraState'){
        return (
          <>
            <TableCell align="left">{`${value/2} (${gstRate/2}%)`}</TableCell>
            <TableCell align="left">{`${value/2} (${gstRate/2}%)`}</TableCell>
          </>
        )
      }else if(supplyType === 'interState'){
        return (
          <TableCell align="left">{`${value} (${gstRate}%)`}</TableCell>
        )
      }else{
        const gstRate = Number(gst) /2;
        return(
          <>
            <TableCell align="left">{`${value/2} (${gstRate/2}%)`}</TableCell>
            <TableCell align="left">{`${value/2} (${gstRate/2}%)`}</TableCell>
          </>
        )
      }
    }
    
    return (
        <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>Item</TableCell>
              {/* <TableCell>HSN/SAC</TableCell> */}
              <TableCell align="left" sx={{fontWeight: 'bold'}}>Qty</TableCell>
              <TableCell align="left" sx={{fontWeight: 'bold'}}>Price (₹)</TableCell>
              <TableCell align="left" sx={{fontWeight: 'bold'}}>GST (%)</TableCell>
              {getGstHeadings()}
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Total (₹)</TableCell>
              {/* <TableCell></TableCell> */}
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
                  const amount = Number(service.qty) * Number(service.price);
                  return (
                    <TableRow key={service.id} sx={{
                      position: 'relative',
                      '&:hover .actions':{
                        display: 'flex'
                      }
                    }}>
                      <TableCell>{service.name}</TableCell>
                      {/* <TableCell>{service.code}</TableCell> */}
                      <TableCell align="left">{service.qty}</TableCell>
                      <TableCell align="left">{service.price}</TableCell>
                      <TableCell align="left">{service.gst}</TableCell>
                      {getGstRowValues(service.qty, service.price, service.gst)}
                      <TableCell align="right">{amount+ calculateTaxableAmountAfterGstForService(service.qty, service.price, service.gst)}</TableCell>
                      

                      <Stack direction="row" className='actions' sx={{
                        alignItems: 'center',
                        gap: '10px',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: 'none',
                        backgroundColor: 'background.paper'
                      }}>
                      <IconButton 
                          size="small" 
                          onClick={() => onEditService(service.id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => onDeleteService(service.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
}