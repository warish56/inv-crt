import { useAtom } from "jotai"
import { servicesAtom } from "../atoms/services"


export const useServiceAtom = () => {
    const [data,  setServices] = useAtom(servicesAtom);

    const addService = (service: typeof data[0]) => {
        setServices((services) => [...services, service])
    }

    const removeService = (id:string) => {
        setServices((services) => services.filter(service => service.id !== id))
    }

    return {
        addService,
        removeService,
        services: data
    }
}