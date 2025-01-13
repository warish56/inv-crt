const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_BANK';

const  collectionData = {
    collection: undefined
};

const Attributes = {
    userId: {
        name: 'user_id',
        type: 'string',
        required: true,

    },
    bankName: {
        name: 'name',
        type: 'string',
        required: true,

    },
    accountHolderName: {
        name: 'holder_name',
        type: 'string',
        required: true,
    },
    accountNumber: {
        name: 'acc_number',
        type: 'string',
        required: true,
    },
    ifscCode: {
        name: 'ifsc',
        type: 'string',
        required: false,
    },
    type: {
        name: 'type',
        type: 'enum',
        required: false,
        values: ['savings', 'current']
    },
}


/**
 * Schema
 *  id      user_id   name     holder_name   acc_number      ifsc       type   
 *  string  string    string   string        string          string      string   
 */



const prepareBankCollection = async () => {

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


const searchBanksByNameOrNumber = async (searchText) => {
    const databases = new sdk.Databases(dbValues.client);
    const result1 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.bankName.name, searchText)
    ]);
    const result2 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.accountNumber.name, searchText)
    ]);
    const totalResults =  [...result1.documents, ...result2.documents];
    const uniqueResults = Array.from(new Map(totalResults.map(result => [result.$id, result])).values())
    return uniqueResults
}

const getBankWithId = async (bankId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, bankId);
    return result;
}

const getUserBanksList = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId)
    ]);
    return result.documents;
}




const createBank = async ({
 userId,
 accountNumber,
 bankName,
 holderName,
 ifscCode,
 accountType,
}) => {

    const dataObj = {
        [Attributes.userId.name]: userId,
        [Attributes.accountHolderName.name]: holderName,
        [Attributes.accountNumber.name]: accountNumber,
        [Attributes.bankName.name]: bankName,
        [Attributes.ifscCode.name]: ifscCode || '',
        ...(accountType ? {[Attributes.type.name]: accountType} : {})
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
    prepareBankCollection,
    createBank,
    searchBanksByNameOrNumber,
    getBankWithId,
    getUserBanksList
}
