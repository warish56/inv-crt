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
        required: false,
        index: sdk.IndexType.Fulltext,
        indexName: 'bank_name_index'
    },
    accountHolderName: {
        name: 'holder_name',
        type: 'string',
        required: false,
        index: sdk.IndexType.Fulltext,
        indexName: 'bank_holder_name_index'
    },
    accountNumber: {
        name: 'acc_number',
        type: 'string',
        required: false,
        index: sdk.IndexType.Fulltext,
        indexName: 'bank_account_number_index'
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


const searchBanksByNameOrNumber = async (userId, searchText) => {
    const databases = new sdk.Databases(dbValues.client);
    const result1 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId),
        Query.search(Attributes.bankName.name, searchText)
    ]);
    const result2 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId),
        Query.search(Attributes.accountNumber.name, searchText)
    ]);
    const result3 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId),
        Query.search(Attributes.accountHolderName.name, searchText)
    ]);
    const totalResults =  [...result1.documents, ...result2.documents, ...result3.documents];
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
        ...(bankName ? {[Attributes.bankName.name]: bankName} : {}),
        ...(accountNumber ? {[Attributes.accountNumber.name]: accountNumber} : {}),
        ...(holderName ? {[Attributes.accountHolderName.name]: holderName} : {}),
        ...(ifscCode ? {[Attributes.ifscCode.name]: ifscCode} : {}),
        ...(accountType ? {[Attributes.type.name]: accountType} : {}),
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


const updateBank = async ({
    bankId,
    accountNumber,
    bankName,
    holderName,
    ifscCode,
    accountType,
   }) => {
   
       const dataObj = {
           ...(bankName ? {[Attributes.bankName.name]: bankName} : {}),
           ...(accountNumber ? {[Attributes.accountNumber.name]: accountNumber} : {}),
           ...(holderName ? {[Attributes.accountHolderName.name]: holderName} : {}),
           ...(ifscCode ? {[Attributes.ifscCode.name]: ifscCode} : {}),
           ...(accountType ? {[Attributes.type.name]: accountType} : {}),
       }
   
       const databases = new sdk.Databases(dbValues.client);
       const document = await databases.updateDocument(
           dbValues.db.$id,
           collectionData.collection.$id,
           bankId,
           dataObj
       );
       return document;
   }
   


module.exports = {
    collectionData,
    prepareBankCollection,
    createBank,
    updateBank,
    searchBanksByNameOrNumber,
    getBankWithId,
    getUserBanksList
}
