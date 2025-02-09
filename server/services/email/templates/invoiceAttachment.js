const {formatCurrency} = require('../../../utils/common')
const dayjs = require('dayjs');

const generateInvoiceAttachmentTemplate = ({
    businessData,
    customerData,
    bankData,
    totalAmount,
    totalBillTaxes,
    subTotal,
    discount,
    shippingGstValue,
    shippingCost,
    services,
    supplyType,
    invoiceId,
    invoiceDate,
    dueDate,
    notes,
    selectedBusinessId,
    selectedCustomerId,
    selectedBankId,
    fromShippingDetails,
    toShippingDetails,
    calculateTaxableAmountAfterGstForService
  }) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
 <style>
  body {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.87);
  margin: 37.795px;
  padding: 15px;
  max-width: 100%;
  background-color: #ffffff;
  font-size: 0.85rem;
}

/* Header */
.header {
  margin-bottom: 15px;
  border-bottom: 1px solid #c2185b;
  padding-bottom: 8px;
}

.header-content{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.business-name {
  color: #c2185b;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.invoice-title {
  font-size: 1.2rem;
  font-weight: 500;
  text-align: right;
  margin-bottom: 4px;
}

.invoice-details {
  text-align: right;
  line-height: 1.3;
  font-size: 0.8rem;
}

.invoice-desc-item{
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
    margin-bottom: 5px;
}

/* Address section */
.address-section {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
  break-inside: avoid;
}

.address-box {
  flex: 1;
  font-size: 0.8rem;
}

.address-box-content{
  padding-left: 6px;
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
}

.address-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.address-content div {
  margin-bottom: 1px;
  line-height: 1.2;
}

/* Shipping section */
.shipping-section {
  margin-bottom: 15px;
  break-inside: avoid;
}

.shipping-title {
  color: #c2185b;
  font-weight: 800;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.shipping-boxes {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.shipping-box {
  flex: 1;
  padding: 4px 10px;
  font-size: 0.8rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
}

.shipping-box div {
  line-height: 1.2;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  break-inside: avoid;
  font-size: 0.8rem;
}

th {
  background-color: #c2185b;
  color: white;
  padding: 4px 6px;
  font-weight: 600;
  font-size: 0.85rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

td {
  padding: 4px 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

tr:nth-child(odd) {
  background-color: #fafafa;
}

/* Footer section */
.footer-section {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 15px;
  break-inside: avoid;
}

.bank-details {
  flex-basis: 45%;
  font-size: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  max-width: 500px;
  overflow: hidden;
}

.bank-header {
  margin-bottom: 8px;
  background-color: #fafafa;
  borderBottom: 1px solid #eeeeee;
  padding: 12px 8px;
}

.bank-content{
  padding: 10px;
}

.bank-content > div {
  margin-bottom: 8px;
}

.bank-content div div:first-child {
  color: #666;
  margin-bottom: 2px;
}

.totals-box {
  flex-basis: 45%;
  padding: 10px;
  font-size: 0.8rem;
  margin-left: auto;
  display: flex;
  flex-flow: column nowrap;
  gap: 6px;
}

.total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.3;
}

.final-total {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  color: #c2185b;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Notes section */
.notes-section {
  margin-top: 15px;
  break-inside: avoid;
  font-size: 0.8rem;
}

.notes-section > div:first-child {
  color: #c2185b;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

    /* Text alignment utilities */
    .text-right {
      text-align: right;
    }

    /* Additional print optimization */
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="header-content">
      <div>
        <div class="business-name">${businessData?.name || 'Business Name'}</div>
        ${businessData?.gstin ? `<div>GSTIN: ${businessData.gstin}</div>` : ''}
      </div>
      <div>
        <div class="invoice-title">INVOICE</div>
        <div class="invoice-desc-item">Invoice No: <strong>${invoiceId || '---'}</strong></div>
        <div class="invoice-desc-item">Date: <strong>${dayjs(invoiceDate).format('DD/MM/YYYY') || '---'}</strong></div>
        ${dueDate ? `<div class="invoice-desc-item">Due Date: <strong>${dayjs(dueDate).format('DD/MM/YYYY') || '---'}</strong></div>` : ''}
      </div>
    </div>
  </div>

  <!-- Address Section -->
  <div class="address-section">
    ${selectedBusinessId ? `
    <div class="address-box">
      <div class="address-title">Bill From</div>
      ${businessData ? `
        <div class="address-box-content">
          <div style="font-weight: 600; margin-bottom: 1px;">${businessData.name}</div>
          <div style="margin-bottom: 1px;">${businessData.address}</div>
          <div style="margin-bottom: 1px;">${businessData.city}, ${businessData.country} - ${businessData.postal_code}</div>
          ${businessData.phone ? `<div style="margin-bottom: 1px;">Tel: ${businessData.phone}</div>` : ''}
          ${businessData.email ? `<div style="margin-bottom: 1px;">Email: ${businessData.email}</div>` : ''}
        </div>
      ` : ''}
    </div>
    ` : ''}

    ${selectedCustomerId ? `
    <div class="address-box">
      <div class="address-title">Bill To</div>
      ${customerData ? `
        <div class="address-box-content">
          <div style="font-weight: 600; margin-bottom: 1px;">${customerData.business_name}</div>
          <div style="margin-bottom: 1px;">${customerData.address}</div>
          <div style="margin-bottom: 1px;">${customerData.city}, ${customerData.country} - ${customerData.postal_code}</div>
          ${customerData.phone_number ? `<div style="margin-bottom: 1px;">Tel: ${customerData.phone_number}</div>` : ''}
          ${customerData.email ? `<div style="margin-bottom: 1px;">Email: ${customerData.email}</div>` : ''}
        </div>
      ` : ''}
    </div>
    ` : ''}
  </div>

  <!-- Shipping Section -->
  ${(fromShippingDetails.address || toShippingDetails.address) ? `
  <div class="shipping-section">
    <div class="shipping-title">Shipping Details</div>
    <div class="shipping-boxes">
      ${fromShippingDetails.address ? `
      <div class="shipping-box">
        <div>From:</div>
        <div>${fromShippingDetails.address}</div>
        <div>${fromShippingDetails.city}, ${fromShippingDetails.state} ${fromShippingDetails.postalCode}</div>
      </div>
      ` : ''}

      ${toShippingDetails.address ? `
      <div class="shipping-box">
        <div>To:</div>
        <div>${toShippingDetails.address}</div>
        <div>${toShippingDetails.city}, ${toShippingDetails.state} ${toShippingDetails.postalCode}</div>
      </div>
      ` : ''}
    </div>
  </div>
  ` : ''}
  
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>HSN/SAC</th>
              <th style="text-align: right;">Qty</th>
              <th style="text-align: right;">Price (₹)</th>
              <th style="text-align: right;">GST %</th>
              <th style="text-align: right;">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${services.map((item, index) => {
              const amount = Number(item.qty) * Number(item.price);
              const gstAmount = calculateTaxableAmountAfterGstForService(item.qty, item.price, item.gst);
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.code}</td>
                  <td style="text-align: right;">${item.qty}</td>
                  <td style="text-align: right;">${formatCurrency(item.price)}</td>
                  <td style="text-align: right;">${item.gst}%</td>
                  <td style="text-align: right;">${formatCurrency(amount + gstAmount)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
  
        <div class="footer-section">

          ${selectedBankId && bankData ? `
          <div class="bank-details">
            <div class="bank-header">
              <div style="font-weight: 600;">Bank Details</div>
            </div>
            <div class="bank-content">
              <div style="margin-bottom: 16px;">
                <div style="color: #666; margin-bottom: 4px;">Account Holder</div>
                <div style="font-weight: 500;">${bankData.holder_name}</div>
              </div>
              ${bankData.acc_number ? `
              <div style="margin-bottom: 16px;">
                <div style="color: #666; margin-bottom: 4px;">Account Number</div>
                <div style="font-weight: 500;">${bankData.acc_number}</div>
              </div>
              ` : ''}
              <div style="margin-bottom: 16px;">
                <div style="color: #666; margin-bottom: 4px;">IFSC Code</div>
                <div style="font-weight: 500;">${bankData.ifsc}</div>
              </div>
            </div>
          </div>
          ` : ''}
  
          <div class="totals-box">
            <div class="total-row">
              <span>Subtotal:</span>
              <strong>${formatCurrency(subTotal)}</strong>
            </div>
  
            ${shippingCost > 0 ? `
            <div class="total-row">
              <span>Shipping:</span>
              <strong>+ ${formatCurrency(shippingCost)}</strong>
            </div>
            ` : ''}
  
            ${discount > 0 ? `
            <div class="total-row" style="color: #4caf50;">
              <span>Discount:</span>
              <strong>- ${formatCurrency(discount)}</strong>
            </div>
            ` : ''}
  
            ${shippingGstValue > 0 ? `
            <div class="total-row">
              <span>Shipping GST:</span>
              <strong>${formatCurrency(shippingGstValue)}</strong>
            </div>
            ` : ''}
  
            ${supplyType === 'interState' ? `
            <div class="total-row">
              <span>IGST:</span>
              <strong>${formatCurrency(totalBillTaxes.igst)}</strong>
            </div>
            ` : ''}
  
            ${supplyType === 'intraState' ? `
            <div class="total-row">
              <span>CGST:</span>
              <strong>${formatCurrency(totalBillTaxes.cgst)}</strong>
            </div>
            <div class="total-row">
              <span>SGST:</span>
              <strong>${formatCurrency(totalBillTaxes.sgst)}</strong>
            </div>
            ` : ''}
  
            ${supplyType === 'unionTerritory' ? `
            <div class="total-row">
              <span>UTGST:</span>
              <strong>${formatCurrency(totalBillTaxes.utgst)}</strong>
            </div>
            ` : ''}
  
            <div class="total-row final-total">
              <span>Total:</span>
              <strong>${formatCurrency(totalAmount)}</strong>
            </div>
          </div>
        </div>
  
        ${notes ? `
        <div class="notes-section">
          <div style="color: #c2185b; margin-bottom: 16px;">Notes</div>
          <div style="white-space: pre-wrap;">${notes}</div>
        </div>
        ` : ''}
      </body>
      </html>
    `;
  };
  
module.exports = {
  generateInvoiceAttachmentTemplate
}