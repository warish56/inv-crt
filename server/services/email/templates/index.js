

const invoice = require('./invoiceEmail');
const previewC = require('./invoiceAttachment')

module.exports = {
    ...invoice,
    ...previewC
}