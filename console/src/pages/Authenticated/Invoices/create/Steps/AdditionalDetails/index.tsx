import {
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Numbers as NumbersIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { StepHeader } from '../../components/StepHeader';
import { useForm } from '@tanstack/react-form';
import { useExtraDetailsAtom } from '../../hooks/useExtraDetailsAtom';
import { FormField } from '../../../../../../components/Form/FormField';
import { useAutoSaveAtom } from '../../hooks/useAutoSaveAtom';
import { isDateAheadAndEqual, nonEmptyValidator } from '@utils/validators';
import { validateField } from '@utils/validators';
import dayjs, { Dayjs } from 'dayjs';
import { DateField } from '../../../../../../components/Form/DateField';

type formState = {
  invoiceId: string;
  invoiceName: string;
  invoiceDate: Dayjs | null;
  dueDate: Dayjs | null;
  notes: string;
}

export const AdditionalDetailsStep = () => {
  const {extraDetails, updateExtraDetails} = useExtraDetailsAtom();
  const {triggerAutoSave} = useAutoSaveAtom();
  const form = useForm<formState>({
    defaultValues: {
      invoiceId: extraDetails.invoiceId ?? '',
      invoiceDate: dayjs(extraDetails.invoiceDate || undefined),
      invoiceName: extraDetails.invoiceName ?? '',
      dueDate: dayjs(extraDetails.dueDate || undefined),
      notes: extraDetails.notes ?? '',
      
    },
    onSubmit: ({value}) => {
      updateExtraDetails({
        ...value,
        invoiceDate: dayjs(value.invoiceDate).format(),
        dueDate: dayjs(value.dueDate).format(),
      });
      triggerAutoSave();
    }
  })

  return (
    <Card 
    component="form"
    onBlur={() => {
      form.handleSubmit();
    }}
    sx={{ 
      bgcolor: 'background.default',
      boxShadow: 'none'
    }}>
      <CardContent sx={{
        p: 0
      }}>

        <StepHeader 
         title='Additional Details'
         description='Fill in the invoice details'
        />

        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <form.Field name='invoiceId'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Invoice Number"
                    disabled
                    placeholder="INV-0001"
                    field={field}
                    onChange={(e) => {
                      return e.target.value.toUpperCase();
                    }}
                    icon={ <NumbersIcon sx={{ color: 'text.secondary' }} />}
                    />
                )}
            </form.Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.Field 
            name='invoiceName'
            validators={{
              onBlur: ({value}) => {
                const validators = [
                  {
                    validator: nonEmptyValidator,
                    errorMessage: 'Invoice name is required'
                  },
                ]
                return validateField(validators, value);
            }
            }}
            >
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Invoice Name"
                    InputLabelProps={{ shrink: true }}
                    field={field}
                    icon={ <CalendarIcon sx={{ color: 'text.secondary' }} />}
                    />
                )}
            </form.Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.Field name='invoiceDate'>
                {(field) => (
                   <DateField 
                   fullWidth
                    label="Invoice Date"
                    field={field}
                   />
                )}
            </form.Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.Field 
            name='dueDate'
            validators={{
              onChange: ({value, fieldApi}) => {
                const validators = [
                  {
                    validator: isDateAheadAndEqual,
                    errorMessage: 'Due date should be greater than invoice date'
                  },
                ]
                return validateField(validators, fieldApi.form.getFieldValue('invoiceDate')?.format(), value?.format());
              }
            }}
            >
                {(field) => (
                    <DateField 
                    fullWidth
                     label="Due Date"
                     field={field}
                    />
                )}
            </form.Field>
          </Grid>

          <Grid item xs={12}>
            <form.Field name='notes'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Notes"
                    multiline
                    rows={4}
                    placeholder="Add any additional notes, terms, or conditions..."
                    InputLabelProps={{ shrink: true }}
                    field={field}
                    icon={null}
                    />
                )}
            </form.Field>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};