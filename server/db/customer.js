const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_Customer';

const  collectionData = {
    collection: undefined
};

const Attributes = {
    userId: {
        name: 'user_id',
        type: 'string',
        required: true,

    },
    country: {
        name: 'country',
        type: 'string',
        required: true,

    },
    businessName: {
        name: 'business_name',
        type: 'string',
        required: true,

    },
    phoneNumber: {
        name: 'phone_number',
        type: 'string',
        required: false,

    },
    postalCode: {
        name: 'postal_code',
        type: 'string',
        required: false,

    },
    gstin: {
        name: 'gstin',
        type: 'string',
        required: false,

    },
    pan: {
        name: 'pan',
        type: 'string',
        required: false,

    },
    address: {
        name: 'address',
        type: 'string',
        required: false,

    },
    city: {
        name: 'city',
        type: 'string',
        required: false,

    },
    state: {
        name: 'state',
        type: 'string',
        required: false,

    },
    email: {
        name: 'email',
        type: 'string',
        required: false,
    }
}


/**
 * Schema
 *  id      user_id   country  business_name  phone_number   postal_code    gstin    pan     address  city     state     email
 *  string  string    string   string        string          string         string   string  string   string   string    string
 */



const prepareCustomerCollection = async () => {

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


const searchCustomersByNameOrEmailOrPhone = async (searchText) => {
    const databases = new sdk.Databases(dbValues.client);
    const result1 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.businessName.name, searchText)
    ]);
    const result2 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.email.name, searchText)
    ]);
    const result3 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.phoneNumber.name, searchText)
    ]);
    const totalResults =  [...result1.documents, ...result2.documents, ...result3.documents];
    const uniqueResults = Array.from(new Map(totalResults.map(result => [result.$id, result])).values())
    return uniqueResults
}

const getCustomerWithId = async (customerId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, customerId);
    return result;
}

const getUserCustomersList = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId)
    ]);
    return result.documents;
}




const createCustomer = async ({
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

    const dataObj = {
        [Attributes.userId.name]: userId,
        [Attributes.country.name]: country || '',
        [Attributes.businessName.name]: businessName || '',
        [Attributes.phoneNumber.name]: phoneNumber || '',
        [Attributes.postalCode.name]: postalCode || '',
        [Attributes.gstin.name]: gstin || '',
        [Attributes.pan.name]: pan || '',
        [Attributes.address.name]: address || '',
        [Attributes.city.name]: city || '',
        [Attributes.state.name]: state || '',
        [Attributes.email.name]: email || '',
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


module.exports = {
    collectionData,
    prepareCustomerCollection,
    createCustomer,
    searchCustomersByNameOrEmailOrPhone,
    getCustomerWithId,
    getUserCustomersList
}
