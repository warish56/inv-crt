const sdk = require("node-appwrite");
const {Query} = sdk;


const waitFor = (time) =>{
    return new Promise((res) => {
        setTimeout(res, time)
    })
}

const getExistingCollection = async (db, databases, colelctionName) => {
    const list = await databases.listCollections(
        db.$id,
        [
            Query.equal("name", [colelctionName])
        ],
    );
    return list.collections[0];
}

const isAttributePresent = (collection, attributeName) => {
    return collection.attributes.find(attribute => attribute.key === attributeName)
}

const createAttributesInDb = async (attributesList, databases, db,  collection) => {
    for( const attribute of attributesList){
        if(isAttributePresent(collection, attribute.name)){
            continue;
        }

        if(attribute.type === 'string'){
            await databases.createStringAttribute(
                db.$id,
                collection.$id,
                attribute.name,
                attribute.size || 255,
                attribute.required
            );
        } 
        
        if(attribute.type === 'number'){
            await databases.createIntegerAttribute(
                db.$id,
                collection.$id,
                attribute.name,
                attribute.required
            );
        } 


        if(attribute.type === 'boolean'){
            await databases.createBooleanAttribute(
                db.$id,
                collection.$id,
                attribute.name,
                attribute.required
            );
        } 

        if(attribute.type === 'date'){
            await databases.createDatetimeAttribute(
                db.$id,
                collection.$id,
                attribute.name,
                attribute.required
            );
        } 

        if(attribute.type === 'enum'){
            await databases.createEnumAttribute(
                db.$id,
                collection.$id,
                attribute.name,
                attribute.values,
                attribute.required
            );
        }
        
        
        // checking if index is present or not

        if(attribute.index){
            await waitFor(1000);
            await databases.createIndex(
                db.$id,
                collection.$id,
                attribute.indexName, // key
                attribute.index, // type
                [attribute.name], // attributes
            );
        }


    }
}



module.exports = {
    getExistingCollection,
    isAttributePresent,
    createAttributesInDb,
    waitFor
}