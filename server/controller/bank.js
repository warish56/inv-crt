const { getUserBanksList, createBank, getBankWithId, updateBank, searchBanksByNameOrNumber } = require("../db/bank");



const getAllBanksOfUser = async (userId) => {
    const banksList = await getUserBanksList(userId);
    return banksList
}

const searchBanksOfUser = async (userId, searchText) => {
    const banksList = await searchBanksByNameOrNumber(userId, searchText);
    return banksList
}

const createNewBankForUser = async ({
    userId,
    accountNumber,
    bankName,
    holderName,
    ifscCode,
    accountType,
}) => {
    const bank = await createBank({
        userId,
        accountNumber,
        bankName,
        holderName,
        ifscCode,
        accountType,
    });

    return bank;
}

const updateBankDetails = async ({
    bankId,
    accountNumber,
    bankName,
    holderName,
    ifscCode,
    accountType,
}) => {
    const bank = await getBankWithId(bankId);
    if(!bank){
        throw {message: 'Bank not found', status: 404}
    }
    const updatedBankDetails = await updateBank({
        bankId,
        accountNumber,
        bankName,
        holderName,
        ifscCode,
        accountType,
    });

    return updatedBankDetails;
}

module.exports = {
    getAllBanksOfUser,
    createNewBankForUser,
    updateBankDetails,
    searchBanksOfUser
}