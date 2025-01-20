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
import { FormField } from '../../common/FormField';
import { useAutoSaveAtom } from '../../hooks/useAutoSaveAtom';

type formState = {
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  notes: string;
}

export const AdditionalDetailsStep = () => {
  const {extraDetails, updateExtraDetails} = useExtraDetailsAtom();
  const {triggerAutoSave} = useAutoSaveAtom();
  const form = useForm<formState>({
    defaultValues: {
      invoiceId: extraDetails.invoiceId ?? '',
      invoiceDate: extraDetails.invoiceDate ?? '',
      dueDate: extraDetails.dueDate ?? '',
      notes: extraDetails.notes ?? '',
    },
    onSubmit: ({value}) => {
      updateExtraDetails(value);
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
            <form.Field name='invoiceDate'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Invoice Date"
                    InputLabelProps={{ shrink: true }}
                    field={field}
                    icon={ <CalendarIcon sx={{ color: 'text.secondary' }} />}
                    />
                )}
            </form.Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.Field name='dueDate'>
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Due Date"
                    InputLabelProps={{ shrink: true }}
                    field={field}
                    icon={ <CalendarIcon sx={{ color: 'text.secondary' }} />}
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