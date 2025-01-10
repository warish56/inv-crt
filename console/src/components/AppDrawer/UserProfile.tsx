import { Typography } from "@mui/material"
import { ListItemButton } from "@mui/material"
import { Box } from "@mui/material"

export const UserProfile = () => {
    return (
        <Box
        sx={{
            p: 2,
            mt: 'auto',
            borderTop: '1px solid',
            borderColor: 'grey.200',
        }}
        >
        <ListItemButton
            sx={{
            borderRadius: '12px',
            bgcolor: 'grey.100',
            '&:hover': {
                bgcolor: 'grey.200',
            },
            }}
        >
            <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                mr: 2,
            }}
            >
            J
            </Box>
            <Box>
            <Typography
                variant="subtitle2"
                sx={{
                fontWeight: 600,
                }}
            >
                John Doe
            </Typography>
            <Typography
                variant="body2"
                sx={{
                color: 'text.secondary',
                }}
            >
                john@example.com
            </Typography>
            </Box>
        </ListItemButton>
        </Box>
    )
}