const { getUserInvoicesList, createInvoice, getInvoiceWithId, updateInvoice, updateInvoiceStatus } = require("../db/invoice");
const { deleteShippingWithId } = require("../db/shipping");
const { createShippingData, updateShippingData } = require("./shipings");


const getAllInvoicesOfUser = async (userId) => {
    const invoicesList = await getUserInvoicesList(userId);
    return invoicesList
}


const createNewInvoiceForUser = async ({
    userId,
    bankId,
    businessId,
    customerId,
    invoiceName,
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
    const shippingId = invoice.shippingId;

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
        ...updatedInvoiceDetails,
        ...updatedShippingData
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

module.exports = {
    getAllInvoicesOfUser,
    createNewInvoiceForUser,
    updateInvoiceDetails,
    updateInvoiceStatusInDb
}