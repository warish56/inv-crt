import { useEffect, useState } from 'react';
import { 
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from '@mui/material';
import { 
  Search,
  GridView,
  ViewList,
  FilterList,
} from '@mui/icons-material';
import { Stats } from './Stats';
import { InvoiceCard } from './components/InvoiceCard';
import { useInvoicesList } from './hooks/useInvoicesList';
import { useSnackbar } from '@hooks/useSnackbar';
import { StatsLoader } from './loaders/stats';
import { InvoiceListLoader } from './loaders/list';

  
export const InvoiceListPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const {data, isPending, error} = useInvoicesList({userId: '1'});
  const {showSnackbar} = useSnackbar()


  useEffect(() => {
    if(data?.[1] || error ){
      showSnackbar({
        message: data?.[1] || error?.message || '',
        type: 'error'
      });
    }
  }, [data, error]);

  const list = data?.[0]?.invoices ?? [];
  const isLoading = isPending;

  const totalAmount = list.reduce((prevValue, currentValue) => currentValue.total_amt + prevValue , 0);
  const pendingAmount = list.reduce((prevValue, currentValue) => currentValue.status === 'pending' ? currentValue.total_amt + prevValue : prevValue , 0)
  const overDueAmount = list.reduce((prevValue, currentValue) => currentValue.status === 'overdue' ? currentValue.total_amt + prevValue : prevValue, 0)

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header and Stats sections remain the same... */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Invoices
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
            {isLoading ?
              <StatsLoader />
              :
              <Stats 
                totalAmount={totalAmount}
                pendingAmount={pendingAmount}
                paidAmount={overDueAmount}
              />
            }
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search invoices..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'grey.500' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ minWidth: '120px' }}
          >
            Filters
          </Button>
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
  );
};
