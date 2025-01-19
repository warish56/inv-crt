
import { InvoiceTemplateA } from './Templates/TemplateA';

export const InvoicePreview = () => {
    return (
            // <Box>
            //   <Typography variant="h6" sx={{ mb: 3 }}>Review Invoice</Typography>
            //   <Box sx={{ mb: 3 }}>
            //     <Chip 
            //       icon={<PersonIcon />} 
            //       label={'No customer selected'} 
            //       sx={{ mr: 1 }}
            //     />
            //     <Chip 
            //       label={`0 items`}
            //       sx={{ mr: 1 }}
            //     />
            //     <Chip 
            //       label={'No due date'}
            //     />
            //   </Box>
            //   <Typography variant="body2" color="text.secondary">
            //     Please review all details before generating the invoice. You can go back to any step to make changes.
            //   </Typography>      
            // </Box>

            <InvoiceTemplateA />
    )
}