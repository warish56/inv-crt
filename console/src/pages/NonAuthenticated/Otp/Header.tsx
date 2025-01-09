import { Typography } from "@mui/material"
import { Box } from "@mui/material"


type props = {
    email: string
}
export const Header = ({email}:props) => {
    return (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          Email Verification
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 1,
            maxWidth: '380px',
          }}
        >
          We've sent a verification code to
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {email}
        </Typography>
      </Box>
    )
}