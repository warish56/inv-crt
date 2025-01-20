import { Outlet, Route, Routes } from "react-router"
import { AuthLayout } from "./Layouts/AuthLayout"
import { LoginPage } from "@pages/NonAuthenticated/Login"
import { OtpPage } from "@pages/NonAuthenticated/Otp"
import { DashboardPage } from "@pages/Authenticated/Dashboard"
import { InvoiceListPage } from "@pages/Authenticated/Invoices/list"
import { SettingsPage } from "@pages/Authenticated/Settings"
import { CustomersPage } from "@pages/Authenticated/Customers"
import { BusinessProfilePage } from "@pages/Authenticated/BusinessProfile"
import { BusinessSelectionStep } from "@pages/Authenticated/Invoices/create/Steps/BusinessSelection"
import { CreateInvoiceLayout } from "@pages/Authenticated/Invoices/create/layout"
import CustomerSelectionStep from "@pages/Authenticated/Invoices/create/Steps/CustomerSelection"
import { ServicesProvidedStep } from "@pages/Authenticated/Invoices/create/Steps/ServicesProvidedStep"
import { ShippingDetailsStep } from "@pages/Authenticated/Invoices/create/Steps/ShippingDetails"
import BankSelection from "@pages/Authenticated/Invoices/create/Steps/BankSelection"
import { AdditionalDetailsStep } from "@pages/Authenticated/Invoices/create/Steps/AdditionalDetails"
import { InvoicePreview } from "@pages/Authenticated/Invoices/create/Preview"
import { CreateOrEditBusiness } from "@pages/Authenticated/Invoices/create/SubSteps/CreateOrEditBusiness"
import { CreateOrEditCustomer } from "@pages/Authenticated/Invoices/create/SubSteps/CreateOrEditCustomer"
import { CreateOrEditBank } from "@pages/Authenticated/Invoices/create/SubSteps/CreateOrEditBank"
import { CreateOrEditService } from "@pages/Authenticated/Invoices/create/SubSteps/CreateOrEditService"



export const RootRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OtpPage />} />

            <Route element={<AuthLayout/>}>
                <Route path="/" element={<DashboardPage />} />

                <Route path="/invoices">
                    <Route index element={<InvoiceListPage />} />
                    <Route path="create" element={<CreateInvoiceLayout />} >


                        <Route path="business" element={<Outlet />} >
                            <Route index element={<BusinessSelectionStep />} />
                            <Route path="create" element={<CreateOrEditBusiness />} />
                            <Route path=":businessId" element={<CreateOrEditBusiness />} />
                        </Route>


                        <Route path="customer" element={<Outlet />} >
                            <Route index element={<CustomerSelectionStep />} />
                            <Route path="create" element={<CreateOrEditCustomer />} />
                            <Route path=":customerId" element={<CreateOrEditCustomer />} />
                        </Route>

                        <Route path="bank" element={<Outlet />} >
                            <Route index element={<BankSelection />} />
                            <Route path="create" element={<CreateOrEditBank />} />
                            <Route path=":bankId" element={<CreateOrEditBank />} />
                        </Route>

                        <Route path="services" element={<Outlet />} >
                            <Route index element={<ServicesProvidedStep />} />
                            <Route path="create" element={<CreateOrEditService />} />
                            <Route path=":serviceId" element={<CreateOrEditService />} />
                        </Route>



                        <Route path="shipping" element={<ShippingDetailsStep />} />
                        <Route path="additional" element={<AdditionalDetailsStep />} />
                        <Route path="preview" element={<InvoicePreview />} />

                    </Route>

                    <Route path="edit/:invoiceId" element={<CreateInvoiceLayout />} >


                        <Route path="business" element={<Outlet />} >
                            <Route index element={<BusinessSelectionStep />} />
                            <Route path="create" element={<CreateOrEditBusiness />} />
                            <Route path=":businessId" element={<CreateOrEditBusiness />} />
                        </Route>


                        <Route path="customer" element={<Outlet />} >
                            <Route index element={<CustomerSelectionStep />} />
                            <Route path="create" element={<CreateOrEditCustomer />} />
                            <Route path=":customerId" element={<CreateOrEditCustomer />} />
                        </Route>

                        <Route path="bank" element={<Outlet />} >
                            <Route index element={<BankSelection />} />
                            <Route path="create" element={<CreateOrEditBank />} />
                            <Route path=":bankId" element={<CreateOrEditBank />} />
                        </Route>

                        <Route path="services" element={<Outlet />} >
                            <Route index element={<ServicesProvidedStep />} />
                            <Route path="create" element={<CreateOrEditService />} />
                            <Route path=":serviceId" element={<CreateOrEditService />} />
                        </Route>



                        <Route path="shipping" element={<ShippingDetailsStep />} />
                        <Route path="additional" element={<AdditionalDetailsStep />} />
                        <Route path="preview" element={<InvoicePreview />} />

                    </Route>


                </Route>
                
                <Route path="/business" element={<BusinessProfilePage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    )
}