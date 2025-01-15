const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_Business_Details';

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
    name: {
        name: 'name',
        type: 'string',
        required: true,
        index: sdk.IndexType.Fulltext,
        indexName: 'business_name_index'
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
    email: {
        name: 'email',
        type: 'string',
        required: false,
    },
    phone: {
        name: 'phone',
        type: 'string',
        required: false,
        index: sdk.IndexType.Fulltext,
        indexName: 'business_phone_index'
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
    postalCode: {
        name: 'postal_code',
        type: 'string',
        required: false,
    },
}


/**
 * Schema
 *  id      user_id  name     email    phone   address  city    state    postal_code  country gstin
 *  string  string   string   string   string  string   string  string   string       string  string
 */



const prepareBusinessCollection = async () => {

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





const searchBusinessByNameOrNumber = async (userId, searchText) => {
    const databases = new sdk.Databases(dbValues.client);

    const result1 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.name.name, searchText),
        Query.equal(Attributes.userId.name, userId)
    ]);
    const result2 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.phone.name, searchText),
        Query.equal(Attributes.userId.name, userId)
    ]);
    const totalResults =  [
        ...result1.documents, 
        ...result2.documents
    ];

    const uniqueResults = Array.from(new Map(totalResults.map(result => [result.$id, result])).values())
    return uniqueResults
}

const getBusinessWithId = async (businessId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, businessId);
    return result;
}

const getUserBusinessList = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId)
    ]);
    return result.documents;
}



const createBusiness = async ({
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
pan
}) => {

    const dataObj = {
        [Attributes.userId.name]: userId,
        [Attributes.name.name]: name,
        [Attributes.country.name]: country,
        ...(phone ? {[Attributes.phone.name]: phone} : {}),
        ...(email ? {[Attributes.email.name]: email} : {}),
        ...(address ? {[Attributes.address.name]: address} : {}),
        ...(city ? {[Attributes.city.name]: city} : {}),
        ...(state ? {[Attributes.state.name]: state} : {}),
        ...(postalCode ? {[Attributes.postalCode.name]: postalCode} : {}),
        ...(gstin ? {[Attributes.gstin.name]: gstin} : {}),
        ...(pan ? {[Attributes.pan.name]: pan} : {}),

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


const updateBusiness = async ({
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
    }) => {
    
        const dataObj = {
            ...(phone ? {[Attributes.phone.name]: phone} : {}),
            ...(name ? {[Attributes.name.name]: name} : {}),
            ...(email ? {[Attributes.email.name]: email} : {}),
            ...(address ? {[Attributes.address.name]: address} : {}),
            ...(city ? {[Attributes.city.name]: city} : {}),
            ...(state ? {[Attributes.state.name]: state} : {}),
            ...(postalCode ? {[Attributes.postalCode.name]: postalCode} : {}),
            ...(gstin ? {[Attributes.gstin.name]: gstin} : {}),
            ...(pan ? {[Attributes.pan.name]: pan} : {}),
        }
    
        const databases = new sdk.Databases(dbValues.client);
        const document = await databases.updateDocument(
            dbValues.db.$id,
            collectionData.collection.$id,
            businessId,
            dataObj
        );
        return document;
    }


module.exports = {
    collectionData,
    prepareBusinessCollection,
    createBusiness,
    updateBusiness,
    getUserBusinessList,
    getBusinessWithId,
    searchBusinessByNameOrNumber
}
