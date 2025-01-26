
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

export const createLink = (url:string, options:{download?:string}) => {
    const a = document.createElement('a');
    a.href = url;
    Object.keys(options).forEach((key:string) => {
        const val = (options as Record<string, string>)[key];
        if(val){
            a.setAttribute(key, val)
        }
    })
    return a;
}

export const downloadBlob = (blob:Blob) => {
    const url = URL.createObjectURL(blob);
    const link = createLink(url, {download: 'invoice.pdf'});
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}