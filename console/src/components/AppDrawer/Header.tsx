import { ChevronLeft } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Typography } from "@mui/material"
import { Box } from "@mui/material"


type props = {
    toggleDrawer: () => void
}

export const Header = ({toggleDrawer}:props) => {
    return (
           <Box
           sx={{
               p: 3,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               borderBottom: '1px solid',
               borderColor: 'grey.100',
           }}
           >
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Box
               sx={{
                   width: 32,
                   height: 32,
                   borderRadius: '8px',
                   background: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   color: 'white',
                   fontSize: '1.2rem',
                   fontWeight: 'bold',
               }}
               >
               A
               </Box>
               <Typography
               variant="h6"
               sx={{
                   fontWeight: 600,
                   background: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
               }}
               >
               AppName
               </Typography>
           </Box>
           <IconButton onClick={toggleDrawer}>
               <ChevronLeft />
           </IconButton>
           </Box>
    )
}