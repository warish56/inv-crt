import { useAtom } from "jotai"
import { servicesAtom } from "../atoms/services"


export const useServiceAtom = () => {
    const [data,  setServices] = useAtom(servicesAtom);

    const addService = (service: typeof data[0]) => {
        setServices((services) => [...services, service])
    }
    const updateService = (existingService: typeof data[0]) => {
        setServices((services) => services.map(( service) => service.id === existingService.id ? existingService: service))
    }

    const removeService = (id:string) => {
        setServices((services) => services.filter(service => service.id !== id))
    }

    return {
        addService,
        updateService,
        removeService,
        services: data
    }
}