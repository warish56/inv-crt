
type ApiData<T> = {
    data: T
}
type ApiError = {
    error: string
}

type ApiResponse<T> =  ApiData<T> & Partial<ApiError>

type AppResult<T> = [null, ApiError['error']] | [ T , null];

type fetchRequestInit = RequestInit & {
    isFormData? : boolean;
    isFileDownload?: boolean;
} 

export const fetchData = async <T>(url:string, options: fetchRequestInit):Promise<AppResult<T>> => {
    try{
        const apiUrl = `${import.meta.env.VITE_API_ROOT_URL}${url}`
        const response = await fetch(apiUrl, {
            ...options,
            headers: {
                ...(!options.isFormData ? {'Content-Type': 'application/json'}: {}),
                ...options.headers,
            },
        });

        if(options.isFileDownload && response.ok){
            const blob = await response.blob();
            return [{blob} as T, null]
        }
        
        const result = await response.json() as Awaited<ApiResponse<T>>;
        if(result.error){
            return [null, result.error]
        }
        return [result.data, null]
    }catch(err){
        return [ null, (err as Error)?.message ?? 'Something went wrong']
    }

}