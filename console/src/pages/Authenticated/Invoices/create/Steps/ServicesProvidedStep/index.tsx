import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { StepHeader } from '../../components/StepHeader';
import { PricebreakDown } from './PriceBreakDown';
import { useBillingAtom } from '../../hooks/useBillingAtom';
import { ServicesList } from './ServicesList';
import { SupplyType } from '@types/tax';
import { useServiceAtom } from '../../hooks/useServiceAtom';
import { useAppNavigation } from '@hooks/useAppNavigation';

type Props = {}

export const ServicesProvidedStep = ({}: Props) => {
  const {updateBillingType, billingDetails}= useBillingAtom();
  const {services}= useServiceAtom();


  const {navigate} = useAppNavigation();

  const onAddService = () => {
    navigate('/invoices/create/services/create')
  }

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
          value={billingDetails.supplyType}
          label="Supply Type"
          onChange={(e) => updateBillingType(e.target.value as SupplyType)}
        >
          <MenuItem value="intraState">Intra State</MenuItem>
          <MenuItem value="interState">Inter State</MenuItem>
          <MenuItem value="unionTerritory">Union Territory</MenuItem>
        </Select>
      </FormControl>


      <ServicesList />

      {services.length > 0 && (
        <PricebreakDown />
      )}
    </Box>
  );
};