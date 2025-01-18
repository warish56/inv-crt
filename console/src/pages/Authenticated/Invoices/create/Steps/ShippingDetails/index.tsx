import {
  Box,
} from '@mui/material';
import { 
  LocalShipping, 
  PlaceOutlined,
} from '@mui/icons-material';

import { StepHeader } from '../../components/StepHeader';
import { useForm } from '@tanstack/react-form';
import { ShippingDetailsForm } from './Form';
import { ShippingExtraDetails } from './ShippingExtraDetails';
import { useShippingAtom } from '../../hooks/useShippingAtom';
import { useSelectionAtom } from '../../hooks/useSelectionAtom';
import { useBusinessList } from '../BusinessSelection/hooks/useBusinessList';
import { useCustomersList } from '../CustomerSelection/hooks/useCustomersList';

type shippingDetails = {
    address: string;
    city: string;
    postalCode: string;
    state: string;
}


type Props = {};

export const ShippingDetailsStep = ({}: Props) => {
  const {
    updateShippingFromAddress,
    updateShippingToAddress,
    setSameAddress,
    shippingData
  } = useShippingAtom()

  const {selectionDetails} = useSelectionAtom();
  const {data: businessResponse} = useBusinessList({userId: '1'});
  const {data: customerResponse} = useCustomersList({userId: '1'});

  const businessData = businessResponse?.[0]?.businesses.find(business => business.$id === selectionDetails.selectedBusinessId);
  const customerData = customerResponse?.[0]?.customers.find(customer => customer.$id === selectionDetails.selectedCustomerId);

  const getDefaultFormValues = (type: 'from' | 'to') => {
    return {
      address: shippingData[type].address ?? '',
      city: shippingData[type].city ?? '',
      postalCode: shippingData[type].postalCode ?? '',
      state: shippingData[type].state ?? '',
    }
  }

  const shipFromForm = useForm<shippingDetails>({
    defaultValues: getDefaultFormValues('from'),
    onSubmit: ({value}) => {
        updateShippingFromAddress(value);
    }
  })

  const shipToForm = useForm<shippingDetails>({
    defaultValues:getDefaultFormValues('to'),
    onSubmit: ({value}) => {
      updateShippingToAddress(value);
    }
  })


  const updateFields = (type: 'from' | 'to', data: shippingDetails) => {
    const form = type === 'from' ? shipFromForm : shipToForm;
    Object.keys(data).forEach((key) => {
      form.setFieldValue(key as keyof shippingDetails, data[key as keyof shippingDetails])
    })
  }
  
  
  const toggleCheckBox = (type: 'from' | 'to', value: boolean) => {
    setSameAddress(type , value);
    if(type === 'from'){
      if(value){
        updateFields('from',{
          address: businessData?.address ?? '',
          city: businessData?.city ?? '',
          postalCode: businessData?.postal_code ?? '',
          state: businessData?.state ?? ''
        })
      }else{
        updateFields('from',{
          address:  '',
          city:  '',
          postalCode:  '',
          state:  '',
        })
      }

    }else if(type === 'to'){
      if(value){
        updateFields('to',{
          address: customerData?.address ?? '',
          city: customerData?.city ?? '',
          postalCode: customerData?.postal_code ?? '',
          state: customerData?.state ?? ''
        })
      }else{
        updateFields('to',{
          address: '',
          city: '',
          postalCode: '',
          state: '',
        })
      }
    }
  }

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default',
        borderRadius: 3
      }}
    >

      <StepHeader 
        title='Shipping Information'
        description='Add the required shipping details'
      />
      

      
      <ShippingDetailsForm 
        title="Ship From" 
        type='from'
        formDisabled={shippingData.fromDetailsSameAsSelectedBusinessDetails}
        showCheckBox={!!selectionDetails.selectedBusinessId}
        checkboxChecked={shippingData.fromDetailsSameAsSelectedBusinessDetails}
        onCheckBoxToggled={(val) => toggleCheckBox('from', val)}
        icon={<LocalShipping fontSize="medium" />} 
        bgColor="background.paper"
        form={shipFromForm}
      />
      
      <ShippingDetailsForm 
        title="Ship To" 
        type='to'
        formDisabled={shippingData.toDetailsSameAsSelectedCustomerDetails}
        showCheckBox={!!selectionDetails.selectedCustomerId}
        checkboxChecked={shippingData.toDetailsSameAsSelectedCustomerDetails}
        onCheckBoxToggled={(val) => toggleCheckBox('to', val)}
        icon={<PlaceOutlined fontSize="medium" />} 
        bgColor="background.paper"
        form={shipToForm}
      /> 
      
      <ShippingExtraDetails />
    </Box>
  );
};