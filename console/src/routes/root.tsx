import { Route, Routes } from "react-router"
import { AuthLayout } from "./Layouts/AuthLayout"
import { LoginPage } from "@pages/NonAuthenticated/Login"
import { OtpPage } from "@pages/NonAuthenticated/Otp"
import { DashboardPage } from "@pages/Authenticated/Dashboard"
import { InvoiceListPage } from "@pages/Authenticated/Invoices/list"
import { CreateInvoicePage } from "@pages/Authenticated/Invoices/create"
import { SettingsPage } from "@pages/Authenticated/Settings"
import { CustomersPage } from "@pages/Authenticated/Customers"
import { BusinessProfilePage } from "@pages/Authenticated/BusinessProfile"



export const RootRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OtpPage />} />

            <Route element={<AuthLayout/>}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/invoices">
                    <Route index element={<InvoiceListPage />} />
                    <Route path="create" element={<CreateInvoicePage />} />
                </Route>
                <Route path="/business" element={<BusinessProfilePage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    )
}