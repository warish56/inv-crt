import { Button, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { FormEvent } from "react";
import { useOtpHandler } from "./hooks/useOtpHandler";


export const OtpForm = () => {

    const {otps, handleChange, handleKeyDown, handlePaste, inputRefs} = useOtpHandler();

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const otpString = otps.join('');
        if (otpString.length !== 6) {
          return;
        }
        // Handle OTP verification
        console.log('Verifying OTP:', otpString);
      };


    return (

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {otps.map((digit, index) => (
            <TextField
              key={index}
              variant="outlined"
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
              }}
              sx={{
                width: { xs: '40px', sm: '56px' },
                height: { xs: '40px', sm: '56px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
                '& input': {
                  fontSize: '1.5rem',
                  padding: 0,
                  textAlign: 'center',
                },
              }}
            />
          ))}
        </Box>

        <Button
          type="submit"
          variant="bold-contained"
          fullWidth
        >
          Verify
        </Button>
      </form>
    )
}