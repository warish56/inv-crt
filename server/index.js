require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {
    prepareDatabase, 
    initAppWriteSdk,
    prepareCustomerCollection,
    prepareBankCollection,
    prepareUserCollection,
    prepareBusinessCollection,
    prepareInvoiceCollection
} = require('./db/index.js')

const BankRouter = require('./routes/bank.js');
const CustomerRouter = require('./routes/customer.js');
const BusinessRouter = require('./routes/business.js');
const InvoiceRouter = require('./routes/invoice.js');



const port = process.env.port || 8001;

const app = express();

// addinf cookie parser to read and set cookies
app.use(cookieParser())

app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

//When your app is behind a proxy, req.ip might show the proxy's IP address. To retrieve the original client IP adding this middleware
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// App Routes Declared from here ========
app.use('/bank', BankRouter);
app.use('/customer', CustomerRouter);
app.use('/business', BusinessRouter);
app.use('/invoice', InvoiceRouter);





const initializeApp = async () => {
    try{
        await initAppWriteSdk();
        await prepareDatabase();
        await prepareCustomerCollection();
        await prepareBankCollection();
        await prepareUserCollection();
        await prepareBusinessCollection();
        await prepareInvoiceCollection();
    }catch(err){
        console.log("Failed init Db ===", err)
    }
}


initializeApp().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port} =======`)
    })
})

