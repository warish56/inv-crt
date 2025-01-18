import {
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useEffect } from 'react';
import { BankCard } from './BankCard';
import { useState } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { debounce } from '@utils/time';
import { useBanksList } from './hooks/useBanksList';
import { useBankSearch } from './hooks/useBankSearch';
import { BankCardSkeleton } from './BankCardSkeleton';
import { StepHeader } from '../../components/StepHeader';
import { useSelectionAtom } from '../../hooks/useSelectionAtom';
import { SelectedAlert } from '../../common/SelectedAlert';

type Props = {}

export const BankSelection = ({}: Props) => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [serverSearchText, setServerSearchText] = useState('');
  const {isPending: isFetchingBanksList, error:listError, data: listData} = useBanksList({userId: '1'})
  const {isPending: isSearching, error:searchError, data:searchData} = useBankSearch({userId: '1', searchText: serverSearchText})
  const {showSnackbar} = useSnackbar();
  const debouncedRef = useRef({ set: debounce(setServerSearchText, 500)})
  const {selectBank, selectionDetails} = useSelectionAtom();
  const lastSelectedRef = useRef<string | null>(null);


  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      debouncedRef.current.set(e.target.value);
  }


  const onAddBank = () => {
    navigate('/invoices/create/bank/create')
  }
  const onEditBank = (bankId:string) => {
    navigate(`/invoices/create/bank/${bankId}`)
  }


  const handleBankSelect = (bankId: string) => {
    lastSelectedRef.current = bankId;
    selectBank(bankId);
  }

  const scrollToSelected = (isInitial = false) => {
    if (selectionDetails.selectedBankId) {
      const element = document.querySelector(`[data-bank-id="${selectionDetails.selectedBankId}"]`);
      if (element) {
        element.scrollIntoView({
          behavior: isInitial ? 'auto' : 'smooth',
          block: 'center'
        });
      }
    }
  };




  useEffect(() => {
    if(listData?.[1] || listError || searchData?.[1] || searchError){
      showSnackbar({
        message: listData?.[1] || listError?.message || searchData?.[1] || searchError?.message ||  '',
        type: 'error'
      })
    }
  }, [listData, listError, searchError, searchData])


  const list = (searchText ? searchData?.[0]?.banks : listData?.[0]?.banks) ?? []
  const isLoading = (searchText && isSearching) || isFetchingBanksList;
  const selectedBank = list.find(b => b.$id === selectionDetails.selectedBankId);


  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      <StepHeader 
        title='Select Bank Account'
        description='Choose a bank account for your transactions'
        onBtnClick={onAddBank}
        btnText='Add Bank'
      />


      {selectedBank && !searchText && (
        <SelectedAlert 
         name={selectedBank.name}
         onLocate={() => scrollToSelected()}
        />
      )}


      <TextField
        fullWidth
        placeholder="Search banks by name or account number..."
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
        {isLoading && <BankCardSkeleton />}
        {!isLoading &&list.map((bank) => (
          <BankCard 
            id={bank.$id}
            bankName={bank.name}
            holderName={bank.holder_name}
            ifscCode={bank.ifsc}
            accountType={bank.type}
            accountNumber={bank.acc_number}
            selected={selectionDetails.selectedBankId === bank.$id} 
            onCardClick={handleBankSelect} 
            onEditBank={onEditBank}   
          />
        ))}
      </Box>
    </Box>
  );
};

export default BankSelection;