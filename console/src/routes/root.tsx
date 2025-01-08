import { Route, Routes } from "react-router"
import { AuthLayout } from "./Layouts/AuthLayout"
import { LoginPage } from "@pages/NonAuthenticated/Login"
import { OtpPage } from "@pages/NonAuthenticated/Otp"
import { DashboardPage } from "@pages/Authenticated/Dashboard"



export const RootRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OtpPage />} />

            <Route element={<AuthLayout/>}>
                <Route path="/" element={<DashboardPage />} />
            </Route>
        </Routes>
    )
}