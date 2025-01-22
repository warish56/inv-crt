
const express = require('express');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllInvoicesOfUser, createNewInvoiceForUser, updateInvoiceDetails, updateInvoiceStatusInDb, getInvoiceFullDetails } = require('../controller/invoice');
const router = express.Router();


router.post('/list', async (req, res) => {
    try{
        const {userId}  = req.body;
        const invoicesList = await getAllInvoicesOfUser(userId);
        return sendSuccessResponse(res, {
            invoices: invoicesList 
        })
    }catch(err){
        console.log("==Error in invoice list ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoices list')
    }
})

router.post('/details', async (req, res) => {
    try{
        const {invoiceId}  = req.body;
        const invoice = await getInvoiceFullDetails(invoiceId);
        return sendSuccessResponse(res, {
            invoice
        })
    }catch(err){
        console.log("==Error in invoice list ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice details')
    }
})

router.post('/create', async (req, res) => {
    try{
        const {
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
        }  = req.body;

        const invoice = await createNewInvoiceForUser({
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
        });
        return sendSuccessResponse(res, {
            invoice
        })
    }catch(err){
        console.log("==Error in creating  invoice ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice creation')
    }
})

router.put('/update', async (req, res) => {
    try{
        const {
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
        }  = req.body;


        const invoice = await updateInvoiceDetails({
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
        });
        return sendSuccessResponse(res, {
            invoice
        })
    }catch(err){
        console.log("==Error in updating  invoice ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice updation')
    }
})

router.put('/update_status', async (req, res) => {
    try{
        const {
            invoiceId,
            status,
        }  = req.body;


        const invoice = await updateInvoiceStatusInDb({
            invoiceId,
            status,
        });
        return sendSuccessResponse(res, {
            invoice
        })
    }catch(err){
        console.log("==Error in updating  invoice ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice status updation')
    }
})

module.exports = router;