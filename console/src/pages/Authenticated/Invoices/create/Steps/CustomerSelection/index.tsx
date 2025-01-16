import {
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { StepHeader } from '../../components/StepHeader';
import { useNavigate } from 'react-router';
import { CustomerCardSkeleton } from './CustomerCardSkeleton';
import { CustomerCard } from './CustomerCard';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { debounce } from '@utils/time';
import { useCustomersList } from './hooks/useCustomersList';
import { useCustomerSearch } from './hooks/useCustomerSearch';

type Props = {}

export const CustomerSelectionStep = ({}: Props) => {

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [serverSearchText, setServerSearchText] = useState('');
  const {isPending: isFetchingCustomersList, error:listError, data: listData} = useCustomersList({userId: '1'})
  const {isPending: isSearching, error:searchError, data:searchData} = useCustomerSearch({userId: '1', searchText: serverSearchText})
  const {showSnackbar} = useSnackbar();
  const debouncedRef = useRef({ set: debounce(setServerSearchText, 500)})


  const onAddCustomer = () => {
    navigate('/invoices/create/customer/create')
  }
  const onEditCustomer = (customerId:string) => {
    navigate(`/invoices/create/customer/${customerId}`)
  }


  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      debouncedRef.current.set(e.target.value);
  }


  useEffect(() => {
    if(listData?.[1] || listError || searchData?.[1] || searchError){
      showSnackbar({
        message: listData?.[1] || listError?.message || searchData?.[1] || searchError?.message ||  '',
        type: 'error'
      })
    }
  }, [listData, listError, searchError, searchData])


  const list = (searchText ? searchData?.[0]?.customers : listData?.[0]?.customers) ?? []
  const isLoading = (searchText && isSearching) || isFetchingCustomersList;



  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>

      <StepHeader 
        title='Select Customer'
        description='Choose a customer for your transaction'
        onBtnClick={onAddCustomer}
        btnText='New Customer'
      />

      {/* Search Section */}
      <TextField
        fullWidth
        placeholder="Search customers by name, GSTIN, or location..."
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
      {isLoading && <CustomerCardSkeleton />}
        {!isLoading && list.map((customer) => (
          <CustomerCard 
            key={customer.$id}
            selected={false} 
            onCardClick={() => {}} 
            id={customer.$id}
            businessName={customer.business_name}
            businessTye='Corporate'
            gstin={customer.gstin}
            email={customer.email}
            address={customer.address}
            city={customer.city}
            state={customer.state}
            onEditCustomer={onEditCustomer}
          />
        ))}

      </Box>
    </Box>
  );
};

export default CustomerSelectionStep;