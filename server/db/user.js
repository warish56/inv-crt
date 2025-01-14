const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_User';

const  collectionData = {
    collection: undefined
};

const Attributes = {
    name: {
        name: 'name',
        type: 'string',
        required: true,

    },
    email: {
        name: 'email',
        type: 'string',
        required: true,
    },
    phone: {
        name: 'phone',
        type: 'string',
        required: false,
    },
}


/**
 * Schema
 *  id      name     email    phone 
 *  string  string   string   string   
 */



const prepareUserCollection = async () => {

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




const getUserWithId = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, userId);
    return result;
}


const getUserWithEmail = async (email) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.email.name, email)
    ]);
    return result.documents[0];
}



const createUser = async ({
name,
email,
phone
}) => {

    const dataObj = {
        [Attributes.name.name]: name,
        [Attributes.email.name]: email,
        ...(phone ? {[Attributes.phone.name]: phone} : {})
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


const updateUser = async ({
    userId,
    name,
    phone
    }) => {
    
        const dataObj = {
            ...(phone ? {[Attributes.phone.name]: phone} : {}),
            ...(name ? {[Attributes.name.name]: name} : {}),
        }
    
        const databases = new sdk.Databases(dbValues.client);
        const document = await databases.updateDocument(
            dbValues.db.$id,
            collectionData.collection.$id,
            userId,
            dataObj
        );
        return document;
    }


module.exports = {
    collectionData,
    prepareUserCollection,
    createUser,
    updateUser,
    getUserWithEmail,
    getUserWithId,
}
