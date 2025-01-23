import { NavigateOptions, useNavigate, useSearchParams } from "react-router"


export const useAppNavigation = () => {
    const nv = useNavigate();
    const [searchParams] = useSearchParams();


    const navigate = (to:string, options?:NavigateOptions) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        nv(`${to}?${new URLSearchParams(currentParams).toString()}`, options)
    }

    return {
        navigate
    }
}