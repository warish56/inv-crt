

export const emailValidator = (value:string|undefined|null) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')
}

export const phoneValidator = (value:string|undefined|null) => {
    return /^\+?[\d\s-]{10,}$/.test(value || '')
}

export const nonEmptyValidator = (value:string|undefined|null) => {
    return !!value;
}



type ValidatorObj = {
    validator: (val:string|undefined|null) => boolean;
    errorMessage: string
}

export const validateField = (value:string|undefined|null, validators:ValidatorObj[]) => {
    const errors = validators.map((item) => {
        return !item.validator(value) ? item.errorMessage : undefined
    }).filter(Boolean);
    return errors[0];
}