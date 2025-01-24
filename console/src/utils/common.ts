

export const generateUniquId = (size = 5) => {
    let str = '';
    for(let i=0; i< size; i++){
        str +=  Math.ceil(10*Math.random())
    }
    return str
}

export const formatCurrency = (amount:number|string) => {
    const value = Number(Number(amount ?? 0).toFixed(2))
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(value);
    return formattedAmount;
}