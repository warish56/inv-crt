import { useSnackbar } from "@hooks/useSnackbar";
import { Box, Snackbar } from "@mui/material"
import { RootRoute } from "@routes/root"



export const App = () => {
    const {open:snackbarOpen, message:snackbarMessage} = useSnackbar();
    return (
        <Box>
            <RootRoute />
            <Snackbar
            open={snackbarOpen}
            message={snackbarMessage}
          />
        </Box>
    )
}