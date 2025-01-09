import { Button, Typography } from "@mui/material"
import { Box } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";


export const Footer = () => {
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
  
    useEffect(() => {
      if (timer > 0 && !canResend) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else if (timer === 0) {
        setCanResend(true);
      }
    }, [timer]);
  
   
    const handleResend = () => {
      setTimer(30);
      setCanResend(false);
      // Handle resend logic
    };
    
    return (

        <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          Didn't receive the code?
        </Typography>
        <Button
          onClick={handleResend}
          disabled={!canResend}
          sx={{
            textTransform: 'none',
            color: 'primary.main',
            '&.Mui-disabled': {
              color: 'text.secondary',
            },
          }}
        >
          {canResend ? 'Resend Code' : `Resend in ${timer}s`}
        </Button>
      </Box>
    )
}