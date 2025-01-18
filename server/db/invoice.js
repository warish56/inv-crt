const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_Invoice';

const  collectionData = {
    collection: undefined
};

const Attributes = {
    userId: {
        name: 'user_id',
        type: 'string',
        required: true,
    },
    bankId: {
        name: 'bank_id',
        type: 'string',
        required: false,
    },
    businessId: {
        name: 'business_id',
        type: 'string',
        required: false,
    },
    customerId: {
        name: 'customer_id',
        type: 'string',
        required: false,
    },
    shippingId: {
        name: 'shipping_id',
        type: 'string',
        required: false,
    },

    invoiceNumber: {
        name: 'invoice_number',
        type: 'string',
        required: false, 
    },
    invoiceDate: {
        name: 'invoice_date',
        type: 'date',
        required: false, 
    },
    invoiceDueDate: {
        name: 'invoice_due_date',
        type: 'date',
        required: false, 
    },
    notes: {
        name: 'notes',
        type: 'string',
        required: false, 
    },
    supplyType: {
        name: 'supply_type',
        type: 'enum',
        values: ['intraState', 'interState' , 'unionTerritory'],
        required: false, 
    },
    discountType: {
        name: 'discount_type',
        type: 'enum',
        values: ['percentage', 'fixed'],
        required: false, 
    },
    discountAmt: {
        name: 'discount_amt',
        type: 'number',
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
    servicesList: {
        name: 'services_list',
        type: 'string',
        size: 2000,
        required: false, 
    },
}


/**
 * Schema
 *  id      user_id  bank_id     business_id    customer_id   shipping_id  invoice_number  invoice_date   invoice_due_date   notes    supply_type  discount_type  discount_amt  services_list  shipping_method  shipping_amt
 *  string  string   string      string         string        string       string          date          date                string   enum         enum           number        string         string           number
 */



const prepareInvoiceCollection = async () => {

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





const getInvoiceWithId = async (invoice) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, invoice);
    return result;
}

const getUserInvoicesList = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
    ]);
    return result.documents;
}



const createInvoice = async ({
userId,
bankId,
businessId,
shippingId,
customerId,
invoiceNumber,
invoiceDate,
invoiceDueDate,
notes,
supplyType,
discountType,
discountAmt,
servicesList,
shippingMethod,
shippingAmt
}) => {

    const dataObj = {
        [Attributes.userId.name]: userId,
        ...(invoiceNumber ? {[Attributes.invoiceNumber.name]: invoiceNumber} : {}),
        ...(bankId ? {[Attributes.bankId.name]: bankId} : {}),
        ...(businessId ? {[Attributes.businessId.name]: businessId} : {}),
        ...(shippingId ? {[Attributes.shippingId.name]: shippingId} : {}),
        ...(customerId ? {[Attributes.customerId.name]: customerId} : {}),
        ...(invoiceDate ? {[Attributes.invoiceDate.name]: invoiceDate} : {}),
        ...(invoiceDueDate ? {[Attributes.invoiceDueDate.name]: invoiceDueDate} : {}),
        ...(notes ? {[Attributes.notes.name]: notes} : {}),
        ...(discountType ? {[Attributes.discountType.name]: discountType} : {}),
        ...(supplyType ? {[Attributes.supplyType.name]: supplyType} : {}),
        ...(discountAmt ? {[Attributes.discountAmt.name]: discountAmt} : {}),
        ...(servicesList ? {[Attributes.servicesList.name]: servicesList} : {}),
        ...(shippingMethod ? {[Attributes.shippingMethod.name]: shippingMethod} : {}),
        ...(shippingAmt ? {[Attributes.shippingAmt.name]: shippingAmt} : {}),
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


const updateInvoice = async ({
    invoiceId,
    bankId,
    businessId,
    shippingId,
    customerId,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    notes,
    supplyType,
    discountType,
    discountAmt,
    servicesList,
    shippingMethod,
    shippingAmt
    }) => {
    
        const dataObj = {
            ...(invoiceNumber ? {[Attributes.invoiceNumber.name]: invoiceNumber} : {}),
            ...(bankId ? {[Attributes.bankId.name]: bankId} : {}),
            ...(businessId ? {[Attributes.businessId.name]: businessId} : {}),
            ...(shippingId ? {[Attributes.shippingId.name]: shippingId} : {}),
            ...(customerId ? {[Attributes.customerId.name]: customerId} : {}),
            ...(invoiceDate ? {[Attributes.invoiceDate.name]: invoiceDate} : {}),
            ...(invoiceDueDate ? {[Attributes.invoiceDueDate.name]: invoiceDueDate} : {}),
            ...(notes ? {[Attributes.notes.name]: notes} : {}),
            ...(discountType ? {[Attributes.discountType.name]: discountType} : {}),
            ...(supplyType ? {[Attributes.supplyType.name]: supplyType} : {}),
            ...(discountAmt ? {[Attributes.discountAmt.name]: discountAmt} : {}),
            ...(servicesList ? {[Attributes.servicesList.name]: servicesList} : {}),
            ...(shippingMethod ? {[Attributes.shippingMethod.name]: shippingMethod} : {}),
            ...(shippingAmt ? {[Attributes.shippingAmt.name]: shippingAmt} : {}),
        }
    
        const databases = new sdk.Databases(dbValues.client);
        const document = await databases.updateDocument(
            dbValues.db.$id,
            collectionData.collection.$id,
            invoiceId,
            dataObj
        );
        return document;
    }


module.exports = {
    collectionData,
    prepareInvoiceCollection,
    createInvoice,
    updateInvoice,
    getUserInvoicesList,
    getInvoiceWithId,
}
