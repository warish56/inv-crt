import { useEffect, useRef, useState } from 'react';
import { 
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { 
  Search,
  GridView,
  ViewList,
} from '@mui/icons-material';
import { Stats } from './Stats';
import { InvoiceCard } from './components/InvoiceCard';
import { useInvoicesList } from './hooks/useInvoicesList';
import { useSnackbar } from '@hooks/useSnackbar';
import { StatsLoader } from './loaders/stats';
import { InvoiceListLoader } from './loaders/list';
import { useInvoiceSearch } from './hooks/useInvoiceSearch';
import { debounce } from '@utils/time';
import { FiltersPopoverButton } from './components/Filters';
import { Filters } from '@types/db';
import { Outlet } from 'react-router';

  
export const InvoiceListPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<Filters>({
    invoiceStatus: '',
    invoiceDueCondition: '',
    invoiceDueDate: null
  })
  const [serverSearchText, setServerSearchText] = useState('');
  const {isPending: isFetchingInvoiceList, error:listError, data: listData} = useInvoicesList({userId: '1', filters});
  const {isPending: isSearching, error:searchError, data:searchData} = useInvoiceSearch({userId: '1', searchText:serverSearchText, filters})
  const {showSnackbar} = useSnackbar();
  const debouncedRef = useRef({ set: debounce(setServerSearchText, 500)});


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


  const list = (searchText ? searchData?.[0]?.invoices : listData?.[0]?.invoices) ?? []
  const initialInvoicesList = listData?.[0]?.invoices ?? [];
  const isLoading = (searchText && isSearching) || isFetchingInvoiceList;


  const totalAmount = initialInvoicesList.reduce((prevValue, currentValue) => currentValue.total_amt + prevValue , 0);
  const pendingAmount = initialInvoicesList.reduce((prevValue, currentValue) => currentValue.status === 'pending' ? currentValue.total_amt + prevValue : prevValue , 0)
  const paidAmount = initialInvoicesList.reduce((prevValue, currentValue) => currentValue.status === 'paid' ? currentValue.total_amt + prevValue : prevValue, 0)
  const overDueAmount = initialInvoicesList.reduce((prevValue, currentValue) => currentValue.status === 'overdue' ? currentValue.total_amt + prevValue : prevValue, 0)

  return (
    <>
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Header and Stats sections remain the same... */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Invoices
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
              {isFetchingInvoiceList ?
                <StatsLoader />
                :
                <Stats 
                  totalAmount={totalAmount}
                  pendingAmount={pendingAmount}
                  paidAmount={paidAmount}
                  overDueAmount={overDueAmount}
                />
              }
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'stretch' }}>
            <TextField
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search invoices using name, customer name, notes..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'grey.500' }} />
                  </InputAdornment>
                ),
              }}
            />
            <FiltersPopoverButton 
              handleFiltersChange={(filters) => setFilters(filters)}
            />
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newValue) => newValue && setViewMode(newValue)}
              aria-label="view mode"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridView />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewList />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Invoices Grid */}
        <Grid container spacing={3}>
          {isLoading && <InvoiceListLoader />}
          {!isLoading && list.map((invoice) => (
            <Grid item xs={12} sm={6} md={4}  key={invoice.$id}>
              <InvoiceCard 
                invoice={invoice} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Outlet/>
    </>
  );
};
