import { InputAdornment } from "@mui/material"
import { TextField, TextFieldProps } from "@mui/material"
import { ValidationError } from "@tanstack/react-form";

type props = {
    icon: React.ReactNode;
    field: {
        state: {
            value: any;
            meta: {
                errors: ValidationError[]
            }
        },
        handleChange: (value:any) => void;
        handleBlur: () => void;
    }
} & TextFieldProps

export const FormField = ({field, icon, ...rest}:props) => {
    const error = field.state.meta.errors.find(Boolean)
    return (
        <TextField
        {...rest}
        value={field.state.value}
        onChange={(e) => {
            const newValue = rest?.onChange?.(e) ?? e.target.value
            field.handleChange(newValue);
        }}
        onBlur={field.handleBlur}
        error={!!error}
        helperText={error || ''}
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            ),
          }}
        />
    )
}