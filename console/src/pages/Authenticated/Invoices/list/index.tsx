import { useState } from 'react';
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
import { InvoiceCard } from './InvoiceCard';

  
export const InvoiceListPage = () => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header and Stats sections remain the same... */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Invoices
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Stats 
                totalAmount={0}
                pendingAmount={0}
                paidAmount={0}
            />
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
        {[].map((invoice) => (
          <Grid item xs={12} sm={6} md={4}  key={invoice.id}>
          <InvoiceCard 
            invoice={invoice} 
          />
        </Grid>
        ))}
      </Grid>
    </Box>
  );
};
