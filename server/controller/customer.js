const { getUserCustomersList, searchCustomersByNameOrEmailOrPhone, createCustomer, updateCustomer, getCustomerWithId } = require("../db/customer");



const getAllCustomersOfUser = async (userId) => {
    const customerList = await getUserCustomersList(userId);
    return customerList
}

const searchCustomersOfUser = async (userId, searchText) => {
    const customerList = await searchCustomersByNameOrEmailOrPhone(userId, searchText);
    return customerList
}

const createNewCustomerForUser = async ({
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
}) => {
    const customer = await createCustomer({
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
    return customer;
}

const updateCustomerDetails = async ({
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
}) => {
    const customer = await getCustomerWithId(customerId);
    if(!customer){
        throw {message: 'Customer not found', status: 404}
    }
    const updatedCustomerDetails = await updateCustomer({
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
    return updatedCustomerDetails;
}

module.exports = {
    getAllCustomersOfUser,
    createNewCustomerForUser,
    updateCustomerDetails,
    searchCustomersOfUser
}