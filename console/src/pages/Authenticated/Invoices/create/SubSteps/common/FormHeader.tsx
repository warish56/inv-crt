import { Grid } from "@mui/material"
import { Typography } from "@mui/material"


type props = {
    title: string;
}
export const FormHeader = ({title}:props) => {
    return (
        <Grid item xs={12}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 2,
            color: 'text.secondary',
            fontWeight: 500 
          }}
        >
          {title}
        </Typography>
      </Grid>
    )
}