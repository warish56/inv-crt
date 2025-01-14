import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";



export const AppQueryClient = new QueryClient();

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