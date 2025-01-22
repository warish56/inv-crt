import { Grid, Skeleton } from "@mui/material"


export const StatsLoader = () => {
    return Array(3).fill(-1).map((item , index) => (
        <Grid key={index} item xs={12} md={4}>
            <Skeleton variant="rounded" animation="wave" sx={{
                height: '97px'
            }}/>
        </Grid>  
    ))
}