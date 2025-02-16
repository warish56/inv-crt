
const express = require('express');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllBusinessOfUser, createNewBusinessForUser, updateBusinessDetails, searchBusinessOfUser, getPersonalBusinessOfUser } = require('../controller/business');
const router = express.Router();


router.post('/list', async (req, res) => {
    try{
        const {userId}  = req.body;
        const businessList = await getAllBusinessOfUser(userId);
        return sendSuccessResponse(res, {
            businesses: businessList 
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
            postalCode,
            country,
            gstin,
            pan,
            personal

        }  = req.body;

        const business = await createNewBusinessForUser({
            userId,
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode,
            country,
            gstin,
            pan,
            personal

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
            postalCode,
            gstin,
            pan,
        }  = req.body;


        const business = await updateBusinessDetails({
            businessId,
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode,
            gstin,
            pan
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

router.post('/personal', async (req, res) => {
    try{
        const {userId}  = req.body;
        const business = await getPersonalBusinessOfUser(userId);
        return sendSuccessResponse(res, {
            business 
        })
    }catch(err){
        console.log("==Error in personal business ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in personal business')
    }
})


module.exports = router;