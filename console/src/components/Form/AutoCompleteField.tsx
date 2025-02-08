import { Autocomplete, Chip, TextFieldProps } from "@mui/material"
import { TextField } from "@mui/material"
import { ValidationError } from "@tanstack/react-form";
import { ComponentProps, useState } from "react";

type props = {
    options?: {label: string}[];
    field: {
        state: {
            value: any;
            meta: {
                errors: ValidationError[]
            }
        },
        handleChange: (value:any) => void;
        handleBlur: () => void;
    };
    textFieldData: TextFieldProps;
} & Partial<ComponentProps<typeof Autocomplete>>

export const AutoCompleteFormField = ({field,options, textFieldData, ...rest}:props) => {
    const [inputValue, setInputValue] = useState('');

    const error = field.state.meta.errors.find(Boolean);

    return (
        <Autocomplete
        {...rest}
        options={options ?? []}
        value={field.state.value}
        onChange={(_, newValue) => {
            field.handleChange(newValue);
        }}
        onBlur={field.handleBlur}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderTags={(value: readonly string[], getTagProps) =>{
            return value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
                <Chip variant="outlined" label={option} key={key} {...tagProps} />
            );
            })
         }
        }
        renderInput={(params) => {
            return (
                <TextField 
                {...textFieldData}
                {...params} 
                error={!!error}
                helperText={error || ''}
                />
            )
        }}
        />
    )
}


