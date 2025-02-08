const { getBankWithId } = require("../db/bank");
const { getBusinessWithId } = require("../db/businessDetails");
const { getCustomerWithId } = require("../db/customer");
const { getUserInvoicesList, createInvoice, getInvoiceWithId, updateInvoice, updateInvoiceStatus, deleteInvoice, searchInvoiceByNameOrCustomerNameOrNotes } = require("../db/invoice");
const { deleteShippingWithId, getShippingWithId } = require("../db/shipping");
const { sendMail } = require("../services/email/provider/sendgrid");
const { generateInvoiceEmailTemplate, getInvoiceEmailTemplate_B } = require("../services/email/templates");
const { InvoiceManager } = require("../services/InvoiceManager");
const { generatePdf } = require("../services/pdf");
const { formatCurrency } = require("../utils/common");
const { createShippingData, updateShippingData } = require("./shipings");
const dayjs = require('dayjs');


const deleteInvoiceDetails = async (invoiceId) => {
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: '404'}
    }
    await deleteInvoice(invoiceId);
}


const getInvoiceFullDetails = async (invoiceId) => {
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: '404'}
    }
    const shippingDetails = await getShippingWithId(invoice.shipping_id);
    return  {
        ...invoice,
        services_list: JSON.parse(invoice.services_list),
        shipping_method: shippingDetails.shipping_method,
        shipping_amt: shippingDetails.shipping_amt,
        from_details: JSON.parse(shippingDetails.from_details),
        to_details: JSON.parse(shippingDetails.to_details),
    }
}


const generatePartialInvoicesList = async (invoicesList) => {
    const result = []
    for(const invoice of invoicesList){
        const customerDetails = await getCustomerWithId(invoice.customer_id);
        const data = {
            $id: invoice.$id,
            status: invoice.invoice_status,
            invoice_name: invoice.invoice_name,
            invoice_number: invoice.invoice_number,
            invoice_date: invoice.invoice_date,
            invoice_due_date: invoice.invoice_due_date,
            total_amt: invoice.invoice_total_amount,
            customer_business_name: customerDetails.business_name,
            customer_business_email: customerDetails.email,
            payment_date: invoice.invoice_payment_date,
        }
        result.push(data)
    }
    return result;
}


const getAllInvoicesOfUser = async (userId, filters) => {
    const invoicesList = await getUserInvoicesList(userId, filters);
    const partialList = await generatePartialInvoicesList(invoicesList);
    return partialList;
}

const sendInvoiceMail = async (payload) => {
    const {
        clientsEmail,
        ccEmails,
        subject,
        message,
        invoiceId,
    } = payload;
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: 404}
    }
    
    const business = await getBusinessWithId(invoice.business_id);
    const customer = await getCustomerWithId(invoice.customer_id);
    const bank = await getBankWithId(invoice.bank_id);
    const shipping = await getShippingWithId(invoice.shipping_id);

    const services =  JSON.parse(invoice.services_list);

    const invoiceManager = new InvoiceManager({
        discount_type: invoice.discount_type,
        discount_amt: invoice.discount_amt,
        services_list: services,
        shipping_amt: shipping.shipping_amt,
        supply_type: invoice.supply_type
    })
    const {
        subTotal,
        discount,
        shippingGstValue,
        shippingCost,
        totalAmount,
        totalBillTaxes
    } = invoiceManager.calculate();

    const attachmentHtmlContent = getInvoiceEmailTemplate_B({
        businessData: business,
        customerData: customer,
        bankData: bank,
        totalAmount,
        totalBillTaxes,
        subTotal,
        discount,
        shippingGstValue,
        shippingCost,
        services,
        supplyType: invoice.supply_type,
        invoiceId: invoice.invoice_number,
        invoiceDate: invoice.invoice_date,
        dueDate: invoice.invoice_due_date,
        notes: invoice.notes,
        selectedBusinessId: !!invoice.business_id,
        selectedCustomerId: !!invoice.customer_id,
        selectedBankId: !!invoice.bank_id,
        fromShippingDetails: JSON.parse(shipping.from_details),
        toShippingDetails: JSON.parse(shipping.to_details),
        calculateTaxableAmountAfterGstForService: invoiceManager.calculateTaxableAmountAfterGstForService,
    })

    const pdf = await generatePdf(attachmentHtmlContent);
    const pdfBase64 = Buffer.from(pdf).toString('base64');


    await sendMail({
        email: clientsEmail,
        subject,
        text: message,
        cc:ccEmails,
        html: generateInvoiceEmailTemplate({
            message,
            invoiceNumber: invoice.invoice_number,
            billingDate: dayjs(invoice.invoice_date).format('D MMMM, YYYY'),
            dueDate: dayjs(invoice.invoice_due_date).format('D MMMM, YYYY'),
            dueAmt: formatCurrency(invoice.invoice_total_amount),
            clientBusinessName: customer?.business_name ?? '',
            senderBusinessName: business?.name ?? '----'
        }),
        attachments:[
            {
                content: pdfBase64,
                filename: `invoice.pdf`,
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: `invoice_${invoice.invoice_number}`,
            },
        ],
    })
} 


const createNewInvoiceForUser = async ({
    userId,
    bankId,
    businessId,
    customerId,
    invoiceName,
    invoiceTotalAmount,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    notes,
    supplyType,
    discountType,
    discountAmt,
    servicesList,
    shippingFromDetails,
    shippingToDetails,
    shippingMethod,
    shippingAmt
}) => {
    let shipping;
    let invoice;
    try{
        shipping = await createShippingData({
            fromAddressDetails: shippingFromDetails,
            toAddressDetails: shippingToDetails,
            shippingMethod,
            shippingAmt,
        })
        invoice = await createInvoice({
            userId,
            bankId,
            businessId,
            customerId,
            invoiceName,
            invoiceTotalAmount,
            invoiceNumber,
            invoiceDate,
            invoiceDueDate,
            notes,
            supplyType,
            discountType,
            discountAmt,
            servicesList,
            shippingId: shipping.$id
        });
        return {
            ...invoice,
            ...shipping
        };
    }catch(err){
        if(shipping && !invoice){
            await deleteShippingWithId(shipping.$id);
        }
        throw err
    }
}

const updateInvoiceDetails = async ({
    invoiceId,
    bankId,
    businessId,
    customerId,
    invoiceName,
    invoiceTotalAmount,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    notes,
    supplyType,
    discountType,
    discountAmt,
    servicesList,
    shippingFromDetails,
    shippingToDetails,
    shippingMethod,
    shippingAmt
}) => {
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: 404}
    }
    const shippingId = invoice.shipping_id;

    // first update the shipping details
    const updatedShippingData  =  await updateShippingData({
        shippingId,
        fromAddressDetails: shippingFromDetails,
        toAddressDetails: shippingToDetails,
        shippingMethod,
        shippingAmt,
    })

    // 2nd update the actual invoice details
    const updatedInvoiceDetails = await updateInvoice({
        invoiceId,
        bankId,
        businessId,
        customerId,
        invoiceName,
        invoiceTotalAmount,
        invoiceNumber,
        invoiceDate,
        invoiceDueDate,
        notes,
        supplyType,
        discountType,
        discountAmt,
        servicesList,
    });

    return {
        ...updatedShippingData,
        ...updatedInvoiceDetails,
    };
}



const updateInvoiceStatusInDb = async ({
    invoiceId,
    status,
}) => {
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: 404}
    }

    const updatedInvoiceDetails = await updateInvoiceStatus({
        invoiceId,
        status,
    });

    return {
        ...updatedInvoiceDetails,
    };
}



const generateInvoicePdf = async (invoiceId, htmlContent) => {
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: '404'}
    }
    const pdf = await generatePdf(htmlContent);
    return pdf;
}

const searchInvoiceOfUser = async (userId, searchText, filters) => {
    const invoicesList = await searchInvoiceByNameOrCustomerNameOrNotes(userId, searchText, filters);
    const partialList = await generatePartialInvoicesList(invoicesList);
    return partialList
}


module.exports = {
    getAllInvoicesOfUser,
    createNewInvoiceForUser,
    updateInvoiceDetails,
    updateInvoiceStatusInDb,
    getInvoiceFullDetails,
    deleteInvoiceDetails,
    generateInvoicePdf,
    searchInvoiceOfUser,
    sendInvoiceMail
}