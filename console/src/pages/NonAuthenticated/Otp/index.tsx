import {
  Box,
  Card,
  Stack,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { Header } from './Header';
import { OtpForm } from './Form';
import { Footer } from './Footer';
import { AnimatedBackground } from './AnimatedBackground';
import { useAtomValue } from 'jotai';
import { authAtom } from '@atoms/auth';
import { Navigate } from 'react-router';

export const OtpPage = () => {

  const authAtomValue = useAtomValue(authAtom);

  if(!authAtomValue.email){
    return <Navigate to='/login' replace/>
  }
 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f8f9fa',
      }}
    >

      <AnimatedBackground/>
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
        }}
      >
        <Stack
          sx={{
            padding: { xs: 3, sm: 5 },
            display: 'flex',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <Email 
            sx={{ 
              fontSize: 48, 
              color: 'primary.main',
              bgcolor: 'primary.lighter',
              p: 2,
              borderRadius: '50%',
              mb: 2
            }} 
          />

          <Header email={authAtomValue.email}/>
          <OtpForm />
          <Footer/>
          </Stack>
      </Card>
    </Box>
  );
};
