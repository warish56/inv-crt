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
import { useEffect, useRef, useState } from 'react';
import { useBusinessSearch } from './hooks/useBusinessSearch';
import { debounce } from '@utils/time';
import { useNavigate } from 'react-router';
import { useSelectionAtom } from '../../hooks/useSelectionAtom';

type Props = {}

export const BusinessSelectionStep = ({}: Props) => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [serverSearchText, setServerSearchText] = useState('');
  const {isPending: isFetchingBusinessList, error:listError, data: listData} = useBusinessList({userId: '1'})
  const {isPending: isSearching, error:searchError, data:searchData} = useBusinessSearch({userId: '1', searchText: serverSearchText})
  const {showSnackbar} = useSnackbar();
  const debouncedRef = useRef({ set: debounce(setServerSearchText, 500)})
  const {selectBusiness, selectionDetails} = useSelectionAtom();

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      debouncedRef.current.set(e.target.value);
  }

  const onAddBusiness = () => {
    navigate('/invoices/create/business/create')
  }
  const onEditBusiness = (businessId:string) => {
    navigate(`/invoices/create/business/${businessId}`)
  }


  useEffect(() => {
    if(listData?.[1] || listError || searchData?.[1] || searchError){
      showSnackbar({
        message: listData?.[1] || listError?.message || searchData?.[1] || searchError?.message ||  '',
        type: 'error'
      })
    }
  }, [listData, listError, searchError, searchData])


  const list = (searchText ? searchData?.[0]?.businesses : listData?.[0]?.businesses) ?? []
  const isLoading = (searchText && isSearching) || isFetchingBusinessList;

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
        value={searchText}
        onChange={handleSearchChange}
        sx={{ 
          mb: 4,
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
        {isLoading && <BusinessCardSkeleton />}
        {!isLoading && list.map((business) => (
          <BusinessCard 
            key={business.$id}
            selected={selectionDetails.selectedBusinessId === business.$id} 
            onCardClick={selectBusiness} 
            id={business.$id}
            businessName={business.name}
            businessTye={'current'}
            gstin={business.gstin}
            email={business.email}
            address={business.address}
            city={business.city}
            state={business.state}
            onEditBusiness={onEditBusiness}
          />
        ))}

      </Box>
    </Box>
  );
};