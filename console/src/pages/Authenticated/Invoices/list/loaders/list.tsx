import { Grid, Skeleton } from "@mui/material"


export const InvoiceListLoader = () => {
    return Array(3).fill(-1).map((item , index) => (
        <Grid item xs={12} sm={6} md={4}  key={index}>
            <Skeleton variant="rounded" animation="wave" sx={{
                height: '188px'
            }}/>
        </Grid>
    ))
}