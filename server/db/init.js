const sdk = require("node-appwrite");

const DB_NAME = process.env.DB_NAME
const values = {
    db: undefined,
    client: undefined
}

const initAppWriteSdk = () => {
    values.client = new sdk.Client();
    values.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(process.env.APP_WRITE_PROJECT_ID)
        .setKey(process.env.APP_WRITE_API_KEY);
}



const prepareDatabase = async () => {
    const databases = new sdk.Databases(values.client);
    const databasesList = await databases.list();
    const existingDatabase = databasesList.databases.find(db => db.name === DB_NAME);
    if(!existingDatabase){
        values.db = await databases.create(
            sdk.ID.unique(),
            DB_NAME
        );
    }else{
        values.db = existingDatabase;
    }

}

module.exports = {
    dbValues: values,
    initAppWriteSdk,
    prepareDatabase
}