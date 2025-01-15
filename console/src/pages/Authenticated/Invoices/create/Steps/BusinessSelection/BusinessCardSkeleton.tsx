import { Skeleton } from "@mui/material"


export const BusinessCardSkeleton = () => {
    return Array(3).fill(1).map((_, index) => {
        return (
            <Skeleton 
            key={index} 
            animation="wave"
            variant="rounded"
            sx={{
                width: '100%',
                height: '171px',
                marginBottom: '10px'
            }} />
        )
    })
}