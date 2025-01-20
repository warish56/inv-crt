const { createShipping, getShippingWithId, updateShipping } = require("../db/shipping");


const createShippingData = async ({
    fromAddressDetails,
    toAddressDetails,
    shippingMethod,
    shippingAmt,
}) => {
    const bank = await createShipping({
        fromAddressDetails,
        toAddressDetails,
        shippingMethod,
        shippingAmt,
    });

    return bank;
}

const updateShippingData = async ({
    shippingId,
    fromAddressDetails,
    toAddressDetails,
    shippingMethod,
    shippingAmt,
}) => {
    const bank = await getShippingWithId(shippingId);
    if(!bank){
        throw {message: 'Shipping details not found', status: 404}
    }
    const updatedBankDetails = await updateShipping({
        shippingId,
        fromAddressDetails,
        toAddressDetails,
        shippingMethod,
        shippingAmt,
    });

    return updatedBankDetails;
}

module.exports = {
    createShippingData,
    updateShippingData
}