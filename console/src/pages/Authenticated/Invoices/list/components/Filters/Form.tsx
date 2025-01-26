import {
  Button,
  MenuItem,
  Typography,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import { ReactFormExtendedApi } from "@tanstack/react-form";
import { InvoiceStatus } from "@types/tax";
import { Dayjs } from "dayjs";
import { FormField } from '@components/Form/FormField';
import { DateField } from '@components/Form/DateField';
import { nonEmptyValidator } from '@utils/validators';
import { validateField } from '@utils/validators';


type formState = {
  invoiceStatus: InvoiceStatus | '';
  invoiceDueCondition: string;
  invoiceDueDate: Dayjs | null;
}

type props = {
  handleClearFilters: () => void;
  form: ReactFormExtendedApi<formState, undefined>;
}

export const FiltersForm = ({handleClearFilters, form}:props) => {
    return (
        <Stack component="form" onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }}>
          <Stack direction="row" sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1
          }}>
            <Typography variant="h6" >
                Filters
            </Typography>
            <Button variant='text' onClick={handleClearFilters}>Clear Filters</Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />

          {/* Invoice Status Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
              Invoice Status
            </Typography>

            <form.Field name='invoiceStatus'>
            {(field) => (
                <FormField
                select
                fullWidth
                field={field}
                label=""
                icon={null}
                >
                    <MenuItem value="">
                        <em>Select Status</em>
                    </MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                </FormField>
            )}
            </form.Field>
          </Box>

          {/* Due Date Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
              Due Date
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              
              <Box sx={{
                flexBasis: '100px',
                flexGrow: 0,
              }}>


                <form.Field 
                name='invoiceDueCondition'
                validators={{
                    onSubmit: ({value, fieldApi}) => {
                        const validators = [
                          {
                            validator: (value:string|undefined|null) => fieldApi.form.getFieldValue('invoiceDueDate') ? nonEmptyValidator(value) : true,
                            errorMessage: 'Condition required'
                          },
                        ]
                        return validateField(validators, value);
                    }
                }}
                >
                {(field) => (
                    <FormField
                    select
                    fullWidth
                    field={field}
                    label="Condition"
                    icon={null}
                    >
                        <MenuItem value="">
                            <em>Select Status</em>
                        </MenuItem>
                        <MenuItem value="equal">Is Equal</MenuItem>
                        <MenuItem value="greater">Is Greater Than</MenuItem>
                        <MenuItem value="less">Is Less Than</MenuItem>
                    </FormField>
                )}
                </form.Field>
              </Box>

              <Box sx={{
                flexGrow: 1,
                flexShrink:0,
              }}>
                <form.Field 
                name='invoiceDueDate'
                validators={{
                    onSubmit: ({value, fieldApi}) => {
                        const validators = [
                          {
                            validator: (value:string|undefined|null) => fieldApi.form.getFieldValue('invoiceDueCondition') ? nonEmptyValidator(value) : true,
                            errorMessage: 'Due date required'
                          },
                        ]
                        return validateField(validators, value?.format());
                    }
                }}
                >
                    {(field) => (
                    <DateField 
                    fullWidth
                    label="Due By"
                    field={field}
                    />
                    )}
                </form.Field>
              </Box>
            </Box>
          </Box>

          {/* Apply Button */}
          <Button
            variant="contained"
            size="medium"
            type='submit'
            fullWidth            
          >
            Apply Filters
          </Button>
        </Stack>
    )

}