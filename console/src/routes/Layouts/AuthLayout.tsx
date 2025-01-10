import { AppDrawer } from "@components/AppDrawer"
import { Box } from "@mui/material"
import { Outlet } from "react-router"


export const AuthLayout = () => {
    return (
        <Box
        sx={{
            minHeight: '100dvh',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr'
        }}>
            <Box>
                <AppDrawer />
            </Box>
            <Box>
                <Outlet/>
            </Box>
        </Box>
    )
}