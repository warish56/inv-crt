

type ApiData<T> = {
    data: T
}
type ApiError = {
    error: string
}

type ApiResponse<T> =  ApiData<T> & Partial<ApiError>

type AppResult<T> = [null, ApiError['error']] | [ T , null];

export const fetchData = async <T>(url:string, options: RequestInit):Promise<AppResult<T>> => {
    try{
        const apiUrl = `${import.meta.env.VITE_API_ROOT_URL}${url}`
        const response = await fetch(apiUrl, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json() as Awaited<ApiResponse<T>>;
        if(result.error){
            return [null, result.error]
        }
        return [result.data, null]
    }catch(err){
        return [ null, (err as Error)?.message ?? 'Something went wrong']
    }

}