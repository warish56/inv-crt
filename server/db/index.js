
const initExports = require('./init');
const bankExports = require('./bank');
const customerExports = require('./customer');


module.exports = {
    ...initExports,
    ...bankExports,
    ...customerExports
}