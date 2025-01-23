

export const emailValidator = (value:string|undefined|null) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')
}

export const phoneValidator = (value:string|undefined|null) => {
    return /^\+?[\d\s-]{10,}$/.test(value || '')
}

export const nonEmptyValidator = (value:string|undefined|null) => {
    return !!value;
}


export const isDateAhead = (value1:string|undefined|null, value2:string|undefined|null) => {
    const d1 = new Date(value1 || '');
    const d2 = new Date(value2 || '');
    return d2.getTime() - d1.getTime() > 0
}

export const isDateAheadAndEqual = (value1:string|undefined|null, value2:string|undefined|null) => {
    const d1 = new Date(value1 || '');
    const d2 = new Date(value2 || '');
    return d2.getTime() - d1.getTime() >= 0
}




type ValidatorObj = {
    validator: (...rest:(string|undefined|null)[]) => boolean;
    errorMessage: string
}

export const validateField = (validators:ValidatorObj[], ...rest:(string|undefined|null)[]) => {
    const errors = validators.map((item) => {
        return !item.validator(...rest) ? item.errorMessage : undefined
    }).filter(Boolean);
    return errors[0];
}