import { FormField } from "@components/Form/FormField";
import { Button, Stack, Typography } from "@mui/material"
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";

import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import GroupIcon from '@mui/icons-material/Group';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { AutoCompleteFormField } from "@components/Form/AutoCompleteField";
import { validateField } from "@utils/validators";
import { nonEmptyValidator } from "@utils/validators";


type formState = {
    clientsEmail: string;
    ccEmails: string[];
    subject: string;
    message: string;
}


type props = {
    onCancel: () => void;
    isSending: boolean;
    form: ReactFormExtendedApi<formState, undefined>

}

export const EmailForm = ({onCancel, form, isSending}:props) => {

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit();
    }

    const handleCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onCancel();
    }

    const hasAnyErrors = form.state.errors.length > 0
    console.log("==errors==",{form: form.state})

    return (
        <Stack 
        component="form"
        onSubmit={handleSubmit}
        sx={{
            gap: '20px',
        }}
        >
            <form.Field name="clientsEmail"
            validators={{
                onChange: ({value}) => {
                    const validators = [
                        {
                          validator: nonEmptyValidator,
                          errorMessage: 'Clients email is required'
                        },
                      ];
                      return validateField(validators, value);
                }
            }}
            >
                {(field) => (
                    <FormField 
                    fullWidth
                    label="Client's Email"
                    placeholder="Enter email address"
                    field={field}
                    icon={ <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                    />
                )}
            </form.Field>

            <form.Field name="ccEmails">
                {(field) => (
                        <AutoCompleteFormField 
                        freeSolo
                        multiple
                        fullWidth
                        getOptionLabel={(option) => option as string}
                        textFieldData={{
                            label:"CC To",
                            placeholder:"CC address",
                        }}
                        field={field}
                        />
                )}
            </form.Field>

            <form.Field 
            name="subject"
            validators={{
                onChange: ({value}) => {
                    const validators = [
                        {
                            validator: nonEmptyValidator,
                            errorMessage: 'Subject is required'
                        },
                        ];
                        return validateField(validators, value);
                }
            }}
            >
                {(field) => (
                        <FormField 
                        fullWidth
                        label="Subject"
                        placeholder="Enter subject"
                        field={field}
                        icon={ <SubjectIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                        />
                )}
            </form.Field>


            <form.Field 
            name="message"
            validators={{
                onChange: ({value}) => {
                    const validators = [
                        {
                          validator: nonEmptyValidator,
                          errorMessage: 'Message is required'
                        },
                      ];
                      return validateField(validators, value);
                }
            }}
            >
                {(field) => (
                        <FormField 
                        fullWidth
                        multiline
                        minRows={5}
                        label="Email message"
                        placeholder="Enter email message"
                        field={field}
                        icon={null}
                        />
                )}
            </form.Field>


            <Stack direction="row" sx={{
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'flex-end'
            }}>
                <Button variant="text" onClick={handleCancel}>Cancel</Button>
                <Button disabled={hasAnyErrors || isSending} variant="contained" type="submit">Send</Button>
            </Stack>

        </Stack>
    )
}