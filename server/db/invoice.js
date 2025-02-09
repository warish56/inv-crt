const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { createAttributesInDb, getExistingCollection } = require("../utils/db");
const { searchCustomersByNameOrEmailOrPhone } = require("./customer");

const {Query} = sdk

const COLLECTION_NAME = 'INVOICE_Invoice';

const  collectionData = {
    collection: undefined
};

const InvoiceStatus = {
    paid: 'paid',
    pending: 'pending',
    overdue: 'overdue'
}

const Attributes = {
    userId: {
        name: 'user_id',
        type: 'string',
        required: true,
    },
    invoiceName: {
        name: 'invoice_name',
        type: 'string',
        required: true,
        index: sdk.IndexType.Fulltext,
        indexName: 'invoice_name_index'
    },
    status: {
        name: 'invoice_status',
        type: 'enum',
        values: ['paid', 'pending', 'overdue'],
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
    invoicePaymentDate: {
        name: 'invoice_payment_date',
        type: 'date',
        required: false, 
    },
    invoiceTotalAmount: {
        name: 'invoice_total_amount',
        type: 'float',
        required: false, 
    },
    notes: {
        name: 'notes',
        type: 'string',
        required: false, 
        index: sdk.IndexType.Fulltext,
        indexName: 'invoice_notes_index'
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
    servicesList: {
        name: 'services_list',
        type: 'string',
        size: 2000,
        required: false, 
    },
}


/**
 * Schema
 *  id      user_id  bank_id  status    business_id    customer_id   shipping_id  invoice_total_amount invoice_number  invoice_date   invoice_due_date invoice_payment_date   notes    supply_type  discount_type  discount_amt  services_list  
 *  string  string   string   enum      string         string        string       number               string          date          date              date                   string   enum         enum           number        string       
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


const deleteInvoice = async (invoiceId) => {
     const databases = new sdk.Databases(dbValues.client);
     await databases.deleteDocument(dbValues.db.$id, collectionData.collection.$id, invoiceId);
}

const getFilterCondition = (condition) => {
    switch(condition){
        case 'greater': return Query.greaterThan;
        case 'less': return Query.lessThan;
        case 'equal': return Query.equal;
        default: return null;
    }
}

const getInvoiceFilters = (filters) => {
    const dbFilters = [];
    Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if(!value){
            return;
        }
        if(key === 'invoiceStatus'){
            dbFilters.push(Query.equal(Attributes.status.name, value));
        }else if(key === 'invoiceDueDate'){
            const queryCondition = getFilterCondition(filters['invoiceDueCondition']);
            dbFilters.push(queryCondition(Attributes.invoiceDueDate.name, value));
        }
    })
    return dbFilters;
}

const getUserInvoicesList = async (userId, filters) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId.name, userId),
        ...getInvoiceFilters(filters),
        Query.orderDesc('$createdAt')
    ]);
    return result.documents;
}


const searchInvoiceByNameOrCustomerNameOrNotes = async (userId, searchText) => {
    const databases = new sdk.Databases(dbValues.client);
    const result1 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.invoiceName.name, searchText),
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
    ]);

    const userCustomers = await searchCustomersByNameOrEmailOrPhone(userId, searchText);

    let result2 = []
    
    if(userCustomers.length > 0){
        result2 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
            Query.equal(Attributes.customerId.name, userCustomers.map(customer => customer.$id)),
            Query.equal(Attributes.userId.name, userId),
            Query.orderDesc('$createdAt')
        ]);
    }



    const result3 = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.search(Attributes.notes.name, searchText),
        Query.equal(Attributes.userId.name, userId),
        Query.orderDesc('$createdAt')
    ]);
    const totalResults =  [
        ...result1.documents, 
        ...(result2?.documents ?? []),
        ...result3.documents
    ];

    const uniqueResults = Array.from(new Map(totalResults.map(result => [result.$id, result])).values())
    return uniqueResults;
}



const createInvoice = async ({
userId,
bankId,
businessId,
customerId,
shippingId,
invoiceName,
invoiceNumber,
invoiceTotalAmount,
invoiceDate,
invoiceDueDate,
notes,
supplyType,
discountType,
discountAmt,
servicesList,
}) => {

    const dataObj = {
        [Attributes.userId.name]: userId,
        [Attributes.invoiceName.name]: invoiceName,
        [Attributes.invoiceNumber.name]: invoiceNumber,
        [Attributes.status.name]: InvoiceStatus.pending,
        [Attributes.invoiceTotalAmount.name]: invoiceTotalAmount,
        ...(bankId ? {[Attributes.bankId.name]: bankId} : {}),
        ...(businessId ? {[Attributes.businessId.name]: businessId} : {}),
        ...(customerId ? {[Attributes.customerId.name]: customerId} : {}),
        ...(invoiceDate ? {[Attributes.invoiceDate.name]: invoiceDate} : {}),
        ...(invoiceDueDate ? {[Attributes.invoiceDueDate.name]: invoiceDueDate} : {}),
        ...(notes ? {[Attributes.notes.name]: notes} : {}),
        ...(discountType ? {[Attributes.discountType.name]: discountType} : {}),
        ...(supplyType ? {[Attributes.supplyType.name]: supplyType} : {}),
        ...(discountAmt ? {[Attributes.discountAmt.name]: Number(discountAmt || 0)} : {}),
        ...(servicesList ? {[Attributes.servicesList.name]: servicesList} : {}),
        ...(shippingId ? {[Attributes.shippingId.name]: shippingId} : {}),
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
    invoiceName,
    businessId,
    customerId,
    invoiceNumber,
    invoiceTotalAmount,
    invoiceDate,
    invoiceDueDate,
    notes,
    supplyType,
    discountType,
    discountAmt,
    servicesList,
    }) => {
    
        const dataObj = {
               [Attributes.invoiceNumber.name]: invoiceNumber,
               [Attributes.invoiceName.name]: invoiceName,
               [Attributes.invoiceTotalAmount.name]: invoiceTotalAmount,
               [Attributes.bankId.name]: bankId,
               [Attributes.businessId.name]: businessId,
               [Attributes.customerId.name]: customerId,
               [Attributes.invoiceDate.name]: invoiceDate,
               [Attributes.invoiceDueDate.name]: invoiceDueDate,
               [Attributes.notes.name]: notes,
               [Attributes.discountType.name]: discountType,
               [Attributes.supplyType.name]: supplyType,
               [Attributes.discountAmt.name]: Number(discountAmt || 0),
               [Attributes.servicesList.name]: servicesList,
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

    const updateInvoiceStatus = async ({
        invoiceId,
        status
        }) => {
        
            const dataObj = {
                [Attributes.status.name]: status,
                ...(status === InvoiceStatus.paid ?  
                    {[Attributes.invoicePaymentDate.name]: new Date().toISOString()} : 
                    {[Attributes.invoicePaymentDate.name]: null}
                )
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
    deleteInvoice,
    updateInvoiceStatus,
    getUserInvoicesList,
    getInvoiceWithId,
    searchInvoiceByNameOrCustomerNameOrNotes
}
