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
    /* Base styles optimized for PDF generation */
    body {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.87);
      margin: 0;
      padding: 20px;
      max-width: 100%;
      background-color: #ffffff;
    }

    /* Header */
    .header {
      margin-bottom: 20px;
      border-bottom: 2px solid #c2185b;
      padding-bottom: 10px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
    }

    .business-name {
      color: #c2185b;
      font-size: 1.75rem;
      font-weight: 500;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .invoice-title {
      font-size: 1.5rem;
      font-weight: 500;
      text-align: right;
      margin-bottom: 8px;
    }

    .invoice-details {
      text-align: right;
      line-height: 1.5;
    }

    /* Address section */
    .address-section {
      display: flex;
      justify-content: space-between;
      gap: 32px;
      margin-bottom: 20px;
      break-inside: avoid;
    }

    .address-box {
      flex: 1;
      padding-left: 8px;
    }

    .address-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .address-content div {
      margin-bottom: 1px;
      line-height: 1.4;
    }

    /* Shipping section */
    .shipping-section {
      margin-bottom: 20px;
      break-inside: avoid;
    }

    .shipping-title {
      color: #c2185b;
      font-weight: 800;
      margin-bottom: 8px;
    }

    .shipping-boxes {
      display: flex;
      justify-content: space-between;
      gap: 32px;
    }

    .shipping-box {
      flex: 1;
      padding: 5px 15px;
    }

    .shipping-box div {
      margin-bottom: 1px;
      line-height: 1.4;
    }

    /* Table */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    th {
      background-color: #c2185b;
      color: white;
      padding: 8px;
      font-weight: 600;
      font-size: 1rem;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    td {
      padding: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    tr:nth-child(odd) {
      background-color: #fafafa;
    }

    /* Footer section */
    .footer-section {
      display: flex;
      justify-content: space-between;
      gap: 32px;
      margin-bottom: 20px;
      break-inside: avoid;
    }

    .bank-details {
      flex: 1;
      padding: 15px;
    }

    .bank-header {
      margin-bottom: 12px;
    }

    .bank-content > div {
      margin-bottom: 12px;
    }

    .bank-content div div:first-child {
      color: #666;
      margin-bottom: 4px;
    }

    .bank-content div div:last-child {
      font-weight: 500;
    }

    .totals-box {
      flex: 1;
      padding: 15px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .final-total {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      color: #c2185b;
      font-weight: 600;
    }

    /* Notes section */
    .notes-section {
      margin-top: 20px;
      break-inside: avoid;
    }

    .notes-section > div:first-child {
      color: #c2185b;
      font-weight: 600;
      margin-bottom: 8px;
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
        <div>Invoice No: <strong>${invoiceId || '---'}</strong></div>
        <div>Date: <strong>${dayjs(invoiceDate).format('DD/MM/YYYY') || '---'}</strong></div>
        ${dueDate ? `<div>Due Date: <strong>${dayjs(dueDate).format('DD/MM/YYYY') || '---'}</strong></div>` : ''}
      </div>
    </div>
  </div>

  <!-- Address Section -->
  <div class="address-section">
    ${selectedBusinessId ? `
    <div class="address-box">
      <div class="address-title">Bill From</div>
      ${businessData ? `
        <div>
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
        <div>
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
        <div style="margin-bottom: 1px;">From:</div>
        <div style="margin-bottom: 1px;">${fromShippingDetails.address}</div>
        <div style="margin-bottom: 1px;">${fromShippingDetails.city}, ${fromShippingDetails.state} ${fromShippingDetails.postalCode}</div>
      </div>
      ` : ''}

      ${toShippingDetails.address ? `
      <div class="shipping-box">
        <div style="margin-bottom: 1px;">To:</div>
        <div style="margin-bottom: 1px;">${toShippingDetails.address}</div>
        <div style="margin-bottom: 1px;">${toShippingDetails.city}, ${toShippingDetails.state} ${toShippingDetails.postalCode}</div>
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