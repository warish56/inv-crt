import { Stack } from "@mui/material"
import { Outlet } from "react-router"


export const AuthLayout = () => {
    return (
        <Stack sx={{
            minHeight: '100dvh'
        }}>
            <Outlet/>
        </Stack>
    )
}