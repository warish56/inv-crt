import {
  Box,
  Card,
  Button,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { AnimatedBackground } from './AnimatedBackground';
import { Footer } from './Footer';
import { Header } from './Header';
import { LoginForm } from './Form';

export const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
        <AnimatedBackground />

      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          margin: { xs: 2, sm: 4 },
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Stack
          sx={{
            padding: { xs: 3, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
         
         <Header/>
         <LoginForm />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', px: 1 }}>
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
          >
            Continue with Google
          </Button>
          <Footer/>
        </Stack>
      </Card>
    </Box>
  );
};