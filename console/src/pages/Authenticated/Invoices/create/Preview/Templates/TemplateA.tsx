
import { useInvoiceAtom } from '../../hooks/useInvoiceAtom';
import { useBusinessList } from '../../Steps/BusinessSelection/hooks/useBusinessList';
import { useCustomersList } from '../../Steps/CustomerSelection/hooks/useCustomersList';
import { useBanksList } from '../../Steps/BankSelection/hooks/useBanksList';
import { useTaxManager } from '../../hooks/useTaxManager';
import { PlainTemplate } from '@pages/Authenticated/Invoices/common/components/Templates/PlainTemplate';


export const InvoiceTemplateA = () => {
  const {invoiceData} = useInvoiceAtom();
  const {shippingDetails, billingDetails, selectedDetails, extraDetails} = invoiceData;
  const {services} = billingDetails;
  const {data: businessResponse} = useBusinessList({userId: '1'});
  const {data: customerResponse} = useCustomersList({userId: '1'});
  const {data: bankResponse} = useBanksList({userId: '1'});
  const {
    totalAmount,
    totalBillTaxes,
    subTotal,
    calculateTaxableAmountAfterGstForService,
    discount,
    shippingGstValue,
    shippingCost
  } = useTaxManager();

  const businessData = businessResponse?.[0]?.businesses.find(business => business.$id === selectedDetails.selectedBusinessId);
  const customerData = customerResponse?.[0]?.customers.find(customer => customer.$id === selectedDetails.selectedCustomerId);
  const bankData = bankResponse?.[0]?.banks.find(bank => bank.$id === selectedDetails.selectedBankId);


  return (
    <PlainTemplate 
    businessData={businessData}
    customerData={customerData}
    bankData={bankData}
    totalAmount={totalAmount}
    totalBillTaxes={totalBillTaxes}
    subTotal={subTotal}
    discount={discount}
    shippingGstValue={shippingGstValue}
    shippingCost={shippingCost}
    services={services}
    supplyType={billingDetails.supplyType}
    invoiceId={extraDetails.invoiceId}
    invoiceDate={extraDetails.invoiceDate}
    dueDate={extraDetails.dueDate}
    notes={extraDetails.notes}
    selectedBusinessId={selectedDetails.selectedBusinessId}
    selectedCustomerId={selectedDetails.selectedCustomerId}
    selectedBankId={selectedDetails.selectedBankId}
    fromShippingDetails={shippingDetails.from}
    toShippingDetails={shippingDetails.to}
    calculateTaxableAmountAfterGstForService={calculateTaxableAmountAfterGstForService}
    />
  )

};