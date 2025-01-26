import { TextFieldProps } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ValidationError } from "@tanstack/react-form";

type props = {
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

export const DateField = ({field, label, ...rest}:props) => {
    const error = field.state.meta.errors.find(Boolean)
    return (

        <DatePicker 
            label={label}
            value={field.state.value}
            onChange={(val) => {
                const newValue = rest?.onChange?.(val) ?? val
                field.handleChange(newValue);
            }}
            slotProps={{
            textField: {
                ...rest,
                onBlur: field.handleBlur,
                error: !!error,
                helperText: error || '',
            },
            }}
        />
    )
}


