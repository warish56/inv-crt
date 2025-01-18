
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
  } from '@mui/material';
  
  import {
    Delete as DeleteIcon,
    Edit as EditIcon
  } from '@mui/icons-material';
import { useServiceAtom } from '../../hooks/useServiceAtom';
import { useNavigate } from 'react-router';
import { useBillingAtom } from '../../hooks/useBillingAtom';
  
export const ServicesList = () => {
    const {services, removeService} = useServiceAtom();
    const {billingDetails} = useBillingAtom();

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
            <TableCell align="left">CGST</TableCell>
            <TableCell align="left">SGST</TableCell>
          </>
        )
      }else if(supplyType === 'interState'){
        return (
          <TableCell align="left">IGST</TableCell>
        )
      }else{
        return(
          <>
            <TableCell align="left">CGST</TableCell>
            <TableCell align="left">UTGST</TableCell>
          </>
        )
      }
    }

    const getGstRowValues = (gst: string) => {
      const {supplyType} = billingDetails;
      if(supplyType === 'intraState'){
        const gstRate = Number(gst)/2;
        return (
          <>
            <TableCell align="left">{gstRate} %</TableCell>
            <TableCell align="left">{gstRate} %</TableCell>
          </>
        )
      }else if(supplyType === 'interState'){
        const gstRate = Number(gst);
        return (
          <TableCell align="left">{gstRate} %</TableCell>
        )
      }else{
        const gstRate = Number(gst) /2;
        return(
          <>
            <TableCell align="left">{gstRate} %</TableCell>
            <TableCell align="left">{gstRate} %</TableCell>
          </>
        )
      }
    }
    
    return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>HSN/SAC</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="left">GST</TableCell>
              {getGstHeadings()}
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
                  const amount = Number(service.qty) * Number(service.price);
                  return (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.code}</TableCell>
                      <TableCell align="right">{service.qty}</TableCell>
                      <TableCell align="right">₹{service.price}</TableCell>
                      <TableCell align="left">{service.gst} %</TableCell>
                      {getGstRowValues(service.gst)}
                      <TableCell align="right">₹{amount}</TableCell>

                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
}