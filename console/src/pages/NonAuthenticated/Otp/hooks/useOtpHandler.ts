import { useRef, useState } from "react";


export const useOtpHandler = () => {

    const [otps, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);


    const handleChange = (index:number, value:string) => {
        if (isNaN(Number(value))) return;

        setOtp((prevOtps) => {
            const newList = [...prevOtps]
            newList[index] = value;
            return newList
        });    
        // Move to next input if value is entered
        if (value !== '' && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      };
    
      const handleKeyDown = (index:number, e:React.KeyboardEvent<HTMLDivElement>) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && index > 0 && otps[index] === '') {
          inputRefs.current[index - 1].focus();
        }
      };
    
      const handlePaste = (e:React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
          const newOtp = [...otps];
          pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
          });
          setOtp(newOtp);
        }
      };
    

      

    return {
        handleChange,
        handleKeyDown,
        handlePaste,
        inputRefs,
        otps
    }
}