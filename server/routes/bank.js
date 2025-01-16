
const express = require('express');
const { sendFailureResponse, sendSuccessResponse } = require('../utils/response');
const { getAllBanksOfUser, createNewBankForUser, updateBankDetails, searchBanksOfUser } = require('../controller/bank');
const router = express.Router();


router.post('/list', async (req, res) => {
    try{
        const {userId}  = req.body;
        const banksList = await getAllBanksOfUser(userId);
        return sendSuccessResponse(res, {
            banks: banksList 
        })
    }catch(err){
        console.log("==Error in banks list ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in banks')
    }
})

router.post('/create', async (req, res) => {
    try{
        const {
            userId,
            accountNumber,
            bankName,
            holderName,
            ifscCode,
            accountType,
        }  = req.body;

        const bank = await createNewBankForUser({
            userId,
            accountNumber,
            bankName,
            holderName,
            ifscCode,
            accountType,
        });
        return sendSuccessResponse(res, {
            bank
        })
    }catch(err){
        console.log("==Error in creating  banks ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in banks creation')
    }
})

router.put('/update', async (req, res) => {
    try{
        const {
            bankId,
            accountNumber,
            bankName,
            holderName,
            ifscCode,
            accountType,
        }  = req.body;


        const bank = await updateBankDetails({
            bankId,
            accountNumber,
            bankName,
            holderName,
            ifscCode,
            accountType,
        });
        return sendSuccessResponse(res, {
            bank
        })
    }catch(err){
        console.log("==Error in updating  banks ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in banks updation')
    }
})

router.post('/search', async (req, res) => {
    try{
        const {userId, searchText}  = req.body;
        const banksList = await searchBanksOfUser(userId, searchText);
        return sendSuccessResponse(res, {
            banks: banksList 
        })
    }catch(err){
        console.log("==Error in banks search ==", err);
        return sendFailureResponse(res, err, 'Something went wrong in banks search')
    }
})


module.exports = router;