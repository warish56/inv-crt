const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_Shipping';

const  collectionData = {
    collection: undefined
};

const Attributes = {
    fromAddressDetails: {
        name: 'from_details',
        type: 'string',
        size: 2000,
        required: false,
    },
    toAddressDetails: {
        name: 'to_details',
        type: 'string',
        size: 2000,
        required: false,
    },
    shippingMethod: {
        name: 'shipping_method',
        type: 'string',
        required: false, 
    },
    shippingAmt: {
        name: 'shipping_amt',
        type: 'number',
        required: false, 
    },

}

/**
 * Every Shipping collection is part of an Invoice
 * 
 */


/**
 * Schema
 *  id        from_details     to_details   shipping_method      shipping_amt    
 *  string    string           string       string                number        
 */



const prepareShippingCollection = async () => {

    const databases = new sdk.Databases(dbValues.client);
    const exisitingCollection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);


    if(exisitingCollection){
        collectionData.collection = exisitingCollection;
    }else{
        collectionData.collection = await databases.createCollection(
            dbValues.db.$id,
            sdk.ID.unique(),
            COLLECTION_NAME
        );
    }

    const currentCollection = collectionData.collection
    const totalAttributes = Object.values(Attributes);
    await createAttributesInDb(totalAttributes, databases, dbValues.db, currentCollection);
}



const getShippingWithId = async (shippingId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, shippingId);
    return result;
}

const deleteShippingWithId = async (shippingId) => {
    const databases = new sdk.Databases(dbValues.client);
    await databases.deleteDocument(dbValues.db.$id, collectionData.collection.$id, shippingId);
}




const createShipping = async ({
 fromAddressDetails,
 toAddressDetails,
 shippingMethod,
 shippingAmt,
}) => {

    const dataObj = {
        ...(fromAddressDetails ? {[Attributes.fromAddressDetails.name]: fromAddressDetails} : {}),
        ...(toAddressDetails ? {[Attributes.toAddressDetails.name]: toAddressDetails} : {}),
        ...(shippingMethod ? {[Attributes.shippingMethod.name]: shippingMethod} : {}),
        ...(shippingAmt ? {[Attributes.shippingAmt.name]: Number(shippingAmt || 0)} : {}),
    }

    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        dataObj
    );
    return document;
}


const updateShipping = async ({
    shippingId,
    fromAddressDetails,
    toAddressDetails,
    shippingMethod,
    shippingAmt,
   }) => {
   
       const dataObj = {
        ...(fromAddressDetails ? {[Attributes.fromAddressDetails.name]: fromAddressDetails} : {}),
        ...(toAddressDetails ? {[Attributes.toAddressDetails.name]: toAddressDetails} : {}),
        ...(shippingMethod ? {[Attributes.shippingMethod.name]: shippingMethod} : {}),
        ...(shippingAmt ? {[Attributes.shippingAmt.name]: Number(shippingAmt || 0)} : {}),
       }
   
       const databases = new sdk.Databases(dbValues.client);
       const document = await databases.updateDocument(
           dbValues.db.$id,
           collectionData.collection.$id,
           shippingId,
           dataObj
       );
       return document;
   }
   


module.exports = {
    collectionData,
    prepareShippingCollection,
    createShipping,
    updateShipping,
    getShippingWithId,
    deleteShippingWithId
}
