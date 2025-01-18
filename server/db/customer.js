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
        index: sdk.IndexType.Fulltext,
        indexName: 'customer_business_name_index'
    },
    phoneNumber: {
        name: 'phone_number',
        type: 'string',
        required: false,
        index: sdk.IndexType.Fulltext,
        indexName: 'customer_business_phone_index'
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
        index: sdk.IndexType.Fulltext,
        indexName: 'customer_business_email_index'
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


const searchCustomersByNameOrEmailOrPhone = async (userId, searchText) => {
    const databases = new sdk.Databases(dbValues.client);
    const result1 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.businessName.name, searchText),
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
    ]);
    const result2 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.email.name, searchText),
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
    ]);
    const result3 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.phoneNumber.name, searchText),
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
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
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
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
        ...(phoneNumber ? {[Attributes.phoneNumber.name]: phoneNumber} : {}),
        ...(postalCode ? {[Attributes.postalCode.name]: postalCode} : {}),
        ...(gstin ? {[Attributes.gstin.name]: gstin} : {}),
        ...(pan ? {[Attributes.pan.name]: pan} : {}),
        ...(address ? {[Attributes.address.name]: address} : {}),
        ...(city ? {[Attributes.city.name]: city} : {}),
        ...(state ? {[Attributes.state.name]: state} : {}),
        ...(email ? {[Attributes.email.name]: email} : {}),
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

const updateCustomer = async ({
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

    const dataObj = {
        [Attributes.country.name]: country || '',
        [Attributes.businessName.name]: businessName || '',
        ...(phoneNumber ? {[Attributes.phoneNumber.name]: phoneNumber} : {}),
        ...(postalCode ? {[Attributes.postalCode.name]: postalCode} : {}),
        ...(gstin ? {[Attributes.gstin.name]: gstin} : {}),
        ...(pan ? {[Attributes.pan.name]: pan} : {}),
        ...(address ? {[Attributes.address.name]: address} : {}),
        ...(city ? {[Attributes.city.name]: city} : {}),
        ...(state ? {[Attributes.state.name]: state} : {}),
        ...(email ? {[Attributes.email.name]: email} : {}),
    }
   
       const databases = new sdk.Databases(dbValues.client);
       const document = await databases.updateDocument(
           dbValues.db.$id,
           collectionData.collection.$id,
           customerId,
           dataObj
       );
       return document;
   }
   


module.exports = {
    collectionData,
    prepareCustomerCollection,
    createCustomer,
    updateCustomer,
    searchCustomersByNameOrEmailOrPhone,
    getCustomerWithId,
    getUserCustomersList
}
