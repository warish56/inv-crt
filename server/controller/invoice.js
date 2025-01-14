const { getUserInvoicesList, createInvoice, getInvoiceWithId, updateInvoice } = require("../db/invoice");


const getAllInvoicesOfUser = async (userId) => {
    const invoicesList = await getUserInvoicesList(userId);
    return invoicesList
}


const createNewInvoiceForUser = async ({
    userId,
    bankId,
    businessId,
    shippingId,
    customerId,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    notes,
    supplyType,
    discountType,
    discountAmt,
    servicesList,
    shippingMethod,
    shippingAmt
}) => {
    const invoice = await createInvoice({
        userId,
        bankId,
        businessId,
        shippingId,
        customerId,
        invoiceNumber,
        invoiceDate,
        invoiceDueDate,
        notes,
        supplyType,
        discountType,
        discountAmt,
        servicesList,
        shippingMethod,
        shippingAmt
    });

    return invoice;
}

const updateInvoiceDetails = async ({
    invoiceId,
    bankId,
    businessId,
    shippingId,
    customerId,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    notes,
    supplyType,
    discountType,
    discountAmt,
    servicesList,
    shippingMethod,
    shippingAmt
}) => {
    const invoice = await getInvoiceWithId(invoiceId);
    if(!invoice){
        throw {message: 'Invoice not found', status: 404}
    }
    const updatedInvoiceDetails = await updateInvoice({
        invoiceId,
        bankId,
        businessId,
        shippingId,
        customerId,
        invoiceNumber,
        invoiceDate,
        invoiceDueDate,
        notes,
        supplyType,
        discountType,
        discountAmt,
        servicesList,
        shippingMethod,
        shippingAmt
    });

    return updatedInvoiceDetails;
}

module.exports = {
    getAllInvoicesOfUser,
    createNewInvoiceForUser,
    updateInvoiceDetails,
}