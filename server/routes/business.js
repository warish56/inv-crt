
const express = require('express');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllBusinessOfUser, createNewBusinessForUser, updateBusinessDetails, searchBusinessOfUser } = require('../controller/business');
const router = express.Router();


router.post('/list', async (req, res) => {
    try{
        const {userId}  = req.body;
        const banksList = await getAllBusinessOfUser(userId);
        return sendSuccessResponse(res, {
            banks: banksList 
        })
    }catch(err){
        console.log("==Error in business list ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in business')
    }
})

router.post('/create', async (req, res) => {
    try{
        const {
            userId,
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode
        }  = req.body;

        const business = await createNewBusinessForUser({
            userId,
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode
        });
        return sendSuccessResponse(res, {
            business
        })
    }catch(err){
        console.log("==Error in creating  business ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in business creation')
    }
})

router.put('/update', async (req, res) => {
    try{
        const {
            businessId,
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode
        }  = req.body;


        const business = await updateBusinessDetails({
            businessId,
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode
        });
        return sendSuccessResponse(res, {
            business
        })
    }catch(err){
        console.log("==Error in updating  business ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in business updation')
    }
})

router.post('/search', async (req, res) => {
    try{
        const {userId, searchText}  = req.body;
        const businessList = await searchBusinessOfUser(userId, searchText);
        return sendSuccessResponse(res, {
            businesses: businessList 
        })
    }catch(err){
        console.log("==Error in business search ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in business search')
    }
})


module.exports = router;