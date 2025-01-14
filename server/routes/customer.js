
const express = require('express');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllCustomersOfUser, createNewCustomerForUser, updateCustomerDetails, searchCustomersOfUser } = require('../controller/customer');
const router = express.Router();


router.post('/list', async (req, res) => {
    try{
        const {userId}  = req.body;
        const customerList = await getAllCustomersOfUser(userId);
        return sendSuccessResponse(res, {
            customers: customerList 
        })
    }catch(err){
        console.log("==Error in customers list ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in customers')
    }
})

router.post('/create', async (req, res) => {
    try{
        const {
            userId,
            country,
            businessName,
            phoneNumber,
            postalCode,
            gstin,
            pan,
            address,
            city,
            state,
            email,
        }  = req.body;

        const customer = await createNewCustomerForUser({
            userId,
            country,
            businessName,
            phoneNumber,
            postalCode,
            gstin,
            pan,
            address,
            city,
            state,
            email,
        });
        return sendSuccessResponse(res, {
            customer
        })
    }catch(err){
        console.log("==Error in creating  customer ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in customer creation')
    }
})

router.put('/update', async (req, res) => {
    try{
        const {
            customerId,
            country,
            businessName,
            phoneNumber,
            postalCode,
            gstin,
            pan,
            address,
            city,
            state,
            email,
        }  = req.body;


        const customer = await updateCustomerDetails({
            customerId,
            country,
            businessName,
            phoneNumber,
            postalCode,
            gstin,
            pan,
            address,
            city,
            state,
            email,
        });
        return sendSuccessResponse(res, {
            customer
        })
    }catch(err){
        console.log("==Error in updating  customer ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in customer updation')
    }
})

router.post('/search', async (req, res) => {
    try{
        const {userId, searchText}  = req.body;
        const customerList = await searchCustomersOfUser(userId, searchText);
        return sendSuccessResponse(res, {
            customers: customerList 
        })
    }catch(err){
        console.log("==Error in customers search ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in customers search')
    }
})


module.exports = router;