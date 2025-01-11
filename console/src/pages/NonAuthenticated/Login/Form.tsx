import { FormEvent, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import { Mail } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useSetAtom } from 'jotai';
import { authAtom } from '@atoms/auth';

export const LoginForm = () => {
   const setAuthAtom = useSetAtom(authAtom);
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      setAuthAtom(prevVal => ({
        ...prevVal,
        email
      }))
      
      navigate('/otp');
      // Handle email sign-in...
    };
    return (
        <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            value={email}
            type='email'
            inputMode="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="bold-contained"
            fullWidth
            >
            Send OTP
          </Button>
        </Box>
      </form>
    )
}