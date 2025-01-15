import {
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { StepHeader } from '../../components/StepHeader';
import { BusinessCard } from './BusinessCard';
import { useBusinessList } from './hooks/useBusinessList';
import { BusinessCardSkeleton } from './BusinessCardSkeleton';
import { useSnackbar } from '@hooks/useSnackbar';
import { useEffect } from 'react';

type Props = {
  selectedBusinessId: number;
  onAddBusiness: () => void;
  handleSelectBusiness: (id: number) => void;
}

export const BusinessSelectionStep = ({
  selectedBusinessId,
  handleSelectBusiness,
  onAddBusiness
}: Props) => {

  const {isPending, error, data} = useBusinessList({userId: '1'})
  const {showSnackbar} = useSnackbar();



  useEffect(() => {
    if(data?.[1] || error){
      showSnackbar({
        message: data?.[1] || error?.message || '',
        type: 'error'
      })
    }
  }, [data, error])


  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>

      <StepHeader 
        title='Select Business'
        description='Choose a business for your transaction'
        onBtnClick={onAddBusiness}
        btnText='New Business'
      />

      <TextField
        fullWidth
        placeholder="Search business by name, GSTIN, or location..."
        variant="outlined"
        sx={{ 
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

     
      <Box sx={{ mt: 2 }}>
        {isPending && <BusinessCardSkeleton />}

        {data && data[0]?.businesses.map((business) => (
          <BusinessCard 
            key={business.$id}
            selected={false} 
            onCardClick={() => {}} 
            id={business.$id}
            businessName={business.name}
            businessTye={'current'}
            gstin={business.gstin}
            email={business.email}
            address={business.address}
            city={business.city}
            state={business.state}
          />
        ))}

      </Box>
    </Box>
  );
};