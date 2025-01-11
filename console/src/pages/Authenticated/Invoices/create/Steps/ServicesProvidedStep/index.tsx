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
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

type service = {
    id: string;
    name: string;
    qty: number;
    rate: number;
    hsn: string;
}

type props = {
    services: service[];
    onAddService: () => void;
}


export const ServicesProvidedStep = ({services, onAddService}:props) => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Add Items</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
           size="medium"
          onClick={onAddService}
        >
          Add Item
        </Button>
      </Box>

      <TableContainer>
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
                services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.hsn}</TableCell>
                  <TableCell align="right">{service.qty}</TableCell>
                  <TableCell align="right">₹{service.rate}</TableCell>
                  <TableCell align="right">₹{service.qty * service.rate}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );