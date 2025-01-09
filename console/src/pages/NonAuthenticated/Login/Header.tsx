import { Typography } from "@mui/material"
import { Box } from "@mui/material"


export const Header = () => {
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem' },
          }}
        >
          Join Our Community
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '400px',
            mx: 'auto',
            mb: 1,
          }}
        >
          Start your journey with us today
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            opacity: 0.8,
          }}
        >
          Get access to exclusive features and personalized content
        </Typography>
      </Box>
    )
}