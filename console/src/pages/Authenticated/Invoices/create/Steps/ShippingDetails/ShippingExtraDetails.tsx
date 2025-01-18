
import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { Paper } from "@mui/material"
import { useForm } from "@tanstack/react-form"
import { FormField } from "../../common/FormField"
import { useShippingAtom } from "../../hooks/useShippingAtom"
import { useAutoSaveAtom } from "../../hooks/useAutoSaveAtom"

type extraDetails = {
    method: string,
    cost: string
}

type props = {}
export const ShippingExtraDetails = ({}:props) => {

  const {
    updateShippingExtraDetails, 
    shippingData
  } = useShippingAtom()
  const {triggerAutoSave} = useAutoSaveAtom();

  const form = useForm<extraDetails>({
    defaultValues: {
      method: shippingData.method ?? '',
      cost: shippingData.cost ?? ''
    },
    onSubmit: ({value}) => {
        updateShippingExtraDetails(value);
    }
  })

  
    return (
        <Paper 
        elevation={0}
        component="form"
        onBlur={() => {
          form.handleSubmit();
          triggerAutoSave();
        }}
        sx={{ 
          p: 3, 
          mb: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Shipping Details
        </Typography>
        <Grid container spacing={3}>


          <Grid item xs={12} sm={6}>
            <form.Field name='method'>
                {(field) => (
                    <FormField
                    fullWidth
                    field={field}
                    label="Shipping Method"
                    onChange={(e) => {
                        return e.target.value.toUpperCase();
                    }}
                    icon={null}
                    />
                )}
            </form.Field>
          </Grid>


          <Grid item xs={12} sm={6}>
            <form.Field name='cost'>
                {(field) => (
                    <FormField
                    fullWidth
                    field={field}
                    label="Shipping Cost"
                    onChange={(e) => {
                        const value = e.target.value
                        return isNaN(Number(value)) ? value.substring(0, value.length-1) : value
                    }}
                    icon={null}
                    />
                )}
            </form.Field>
          </Grid>
        </Grid>
      </Paper>
    )
}