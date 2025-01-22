import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";



export const AppQueryClient = new QueryClient({
    defaultOptions:{
        queries: {
            staleTime: 1000 * 60 * 5, // 5 min,
            refetchOnMount: true
        }
    }
});

type props = {
    children: React.ReactNode
}

export const AppQueryClientProvider = ({children}:props) => {
    return (
        <QueryClientProvider client={AppQueryClient}>
            {children}
        </QueryClientProvider>
    )
}