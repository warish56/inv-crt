import { useState } from 'react';
import {
  Popover,
  Stack,
} from '@mui/material';
import { FiltersForm } from './Form';
import { FilterButton } from './Button';
import { useForm } from '@tanstack/react-form';
import { InvoiceStatus } from '@types/tax';
import { Filters } from '@types/db';
import { Dayjs } from 'dayjs';

type formState = {
  invoiceStatus: InvoiceStatus | '';
  invoiceDueCondition: string;
  invoiceDueDate: Dayjs | null;
}

type props = {
    handleFiltersChange: (payload: Filters) => void;
}

export const FiltersPopoverButton = ({ handleFiltersChange}:props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const form = useForm<formState>({
    defaultValues: {
        invoiceStatus: '',
        invoiceDueCondition: '',
        invoiceDueDate: null
    },
    onSubmit: ({value}) => {
        handleFiltersApply({
            ...value,
            invoiceDueDate: value.invoiceDueDate?.format() || ''
        });
    }
})

const handleClearFilters = () => {
    form.reset();
    handleFiltersApply({
        ...form.state.values,
        invoiceDueDate: form.state.values.invoiceDueDate?.format() || ''
    })
}



  const handleFiltersOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleFiltersApply = (payload:Filters) => {
    handleFiltersChange(payload);
    handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? 'filters-popover' : undefined;
  const isFiltersApplied = Object.values(form.state.values).filter(Boolean).length > 0

  return (
        <Stack direction="row" sx={{alignItems: 'stretch'}}>
          <FilterButton handleClick={handleFiltersOpen} active={isFiltersApplied}/>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                borderRadius: '12px',
                boxShadow: 6,
                minWidth: '450px',
                p: 2,
              },
            }}
          >
              <FiltersForm 
              handleClearFilters={handleClearFilters}
              form={form} 
              />
          </Popover>
        </Stack>
  );
};