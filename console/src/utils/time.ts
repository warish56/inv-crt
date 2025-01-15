

export const debounce = (callback: Function, time: number) => {
    let timer:number|null = null;
    return function(...args: unknown[]){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(callback.bind(this, ...args), time)
    }
}