
const express = require('express');
const multer = require('multer');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllInvoicesOfUser, createNewInvoiceForUser, updateInvoiceDetails, updateInvoiceStatusInDb, getInvoiceFullDetails, deleteInvoiceDetails, generateInvoicePdf } = require('../controller/invoice');
const router = express.Router();
// Configure Multer for file storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });



router.post('/download', upload.single('file'), async (req, res) => {
    try{
        const {invoiceId}  = req.body;
        const htmlContent = req.file.buffer.toString();
        const pdf = await generateInvoicePdf(invoiceId, `${htmlContent}`);
        const date = new Date().toLocaleDateString();
        res.header({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=invoice_${date.split('/').join('_')}.pdf`,
        });
        res.end(pdf);
    }catch(err){
        console.log("==Error in invoice download ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice downloading')
    }
})


router.delete('/delete', async (req, res) => {
    try{
        const {invoiceId}  = req.body;
        await deleteInvoiceDetails(invoiceId);
        return sendSuccessResponse(res, {
            success: true 
        })
    }catch(err){
        console.log("==Error in invoice deleting ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice deletion')
    }
})


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
        }  = req.body;

        const invoice = await createNewInvoiceForUser({
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
        }  = req.body;


        const invoice = await updateInvoiceDetails({
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
            success: true
        })
    }catch(err){
        console.log("==Error in updating  invoice ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in invoice status updation')
    }
})

module.exports = router;