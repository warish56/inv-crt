import { Typography } from "@mui/material"


export const Footer = () => {
    return (
        <Typography
        variant="body2"
        align="center"
        sx={{
          color: 'text.secondary',
          mt: 2,
          '& a': {
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        }}
      >
        By continuing, you agree to our{' '}
        <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>
      </Typography>
    )
}