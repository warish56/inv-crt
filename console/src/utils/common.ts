

export const generateUniquId = (size = 5) => {
    let str = '';
    for(let i=0; i< size; i++){
        str +=  Math.ceil(10*Math.random())
    }
    return str
}