
const initExports = require('./init');
const bankExports = require('./bank');
const customerExports = require('./customer');
const userExports = require('./user');
const businessExports = require('./businessDetails');
const invoiceExports = require('./invoice');





module.exports = {
    ...initExports,
    ...bankExports,
    ...customerExports,
    ...userExports,
    ...businessExports,
    ...invoiceExports
}