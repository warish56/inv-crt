const { getUserBusinessList, searchBusinessByNameOrNumber, createBusiness, getBusinessWithId, updateBusiness } = require("../db/businessDetails");



const getAllBusinessOfUser = async (userId) => {
    const businessList = await getUserBusinessList(userId);
    return businessList
}

const searchBusinessOfUser = async (userId, searchText) => {
    const businessList = await searchBusinessByNameOrNumber(userId, searchText);
    return businessList
}

const createNewBusinessForUser = async ({
    userId,
    name,
    email,
    phone,
    address,
    city,
    state,
    postalCode
}) => {
    const business = await createBusiness({
        userId,
        name,
        email,
        phone,
        address,
        city,
        state,
        postalCode
    });

    return business;
}

const updateBusinessDetails = async ({
    businessId,
    name,
    email,
    phone,
    address,
    city,
    state,
    postalCode
}) => {
    const business = await getBusinessWithId(businessId);
    if(!business){
        throw {message: 'Business not found', status: 404}
    }
    const updatedBusinessDetails = await updateBusiness({
        businessId,
        name,
        email,
        phone,
        address,
        city,
        state,
        postalCode
    });

    return updatedBusinessDetails;
}

module.exports = {
    getAllBusinessOfUser,
    createNewBusinessForUser,
    updateBusinessDetails,
    searchBusinessOfUser
}