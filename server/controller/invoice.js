const { getCustomerWithId } = require("../db/customer");
const { getUserInvoicesList, createInvoice, getInvoiceWithId, updateInvoice, updateInvoiceStatus, deleteInvoice, searchInvoiceByNameOrCustomerNameOrNotes } = require("../db/invoice");
const { deleteShippingWithId, getShippingWithId } = require("../db/shipping");
const { generatePdf } = require("../services/pdf");
const { createShippingData, updateShippingData } = require("./shipings");


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
    searchInvoiceOfUser
}