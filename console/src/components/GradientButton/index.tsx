import { Button, ButtonProps, useTheme } from "@mui/material"
type props ={
    active?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode
    sx?: ButtonProps['sx']
} & ButtonProps
export const GradientButton = ({active, children, icon, sx={}, ...rest}:props) => {
    const theme = useTheme();
    return(
        <Button
        {...rest}
        variant="outlined"
        startIcon={icon}
        sx={{
        minWidth: '120px',
        background: active
            ? `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
            : 'inherit', // Default background when no filters are selected
        backgroundSize: active ? '300% 300%' : 'inherit',
        animation: active ? 'gradientAnimation 4s ease infinite' : 'none',
        color: active ? theme.palette.primary.contrastText : 'primary.main', // Use contrast text for better visibility
        transition: 'background 0.5s ease, color 0.5s ease, border-color 0.5s ease', // Smooth transitions
        '&:hover': {
            background: active
            ? `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
            : 'inherit',
        },
        '@keyframes gradientAnimation': {
            '0%': {
            backgroundPosition: '0% 50%',
            },
            '50%': {
            backgroundPosition: '100% 50%',
            },
            '100%': {
            backgroundPosition: '0% 50%',
            },
        },
        ...sx
        }}
    >
        {children}
        </Button>
    )
}