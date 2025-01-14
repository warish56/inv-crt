
const express = require('express');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllInvoicesOfUser, createNewInvoiceForUser, updateInvoiceDetails } = require('../controller/invoice');
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
        return sendFailureResponse(res, err, 'Something went wrong in invoices')
    }
})

router.post('/create', async (req, res) => {
    try{
        const {
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
        }  = req.body;

        const invoice = await createNewInvoiceForUser({
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
        }  = req.body;


        const invoice = await updateInvoiceDetails({
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
        return sendSuccessResponse(res, {
            invoice
        })
    }catch(err){
        console.log("==Error in updating  invoice ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice updation')
    }
})

module.exports = router;