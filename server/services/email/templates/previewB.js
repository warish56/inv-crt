const {formatCurrency} = require('../../../utils/common')
const dayjs = require('dayjs');

const getInvoiceEmailTemplate_B = ({
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
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: rgba(0, 0, 0, 0.87);
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            margin-bottom: 40px;
            border-bottom: 2px solid #c2185b;
            padding-bottom: 20px;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
          }
          .business-name {
            color: #c2185b;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .invoice-title {
            font-size: 20px;
            text-align: right;
            margin-bottom: 16px;
          }
          .address-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .address-box {
            width: 45%;
          }
          .address-title {
            font-size: 16px;
            font-weight: 600;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
            margin-bottom: 16px;
          }
          .shipping-section {
            margin-bottom: 30px;
          }
          .shipping-title {
            color: #c2185b;
            font-weight: 800;
            margin-bottom: 16px;
          }
          .shipping-boxes {
            display: flex;
            justify-content: space-between;
            gap: 20px;
          }
          .shipping-box {
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            width: 45%;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background-color: #c2185b;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
          }
          tr:nth-child(odd) {
            background-color: #fafafa;
          }
          .footer-section {
            display: flex;
            justify-content: space-between;
            gap: 20px;
          }
          .bank-details {
            width: 45%;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
          }
          .bank-header {
            background-color: #fafafa;
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
          }
          .bank-content {
            padding: 20px;
          }
          .totals-box {
            width: 45%;
            background-color: #fafafa;
            padding: 20px;
            border-radius: 8px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          .final-total {
            border-top: 1px solid #e0e0e0;
            padding-top: 12px;
            color: #c2185b;
            font-weight: bold;
          }
          .notes-section {
            background-color: #fafafa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
      
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
  
        <div class="address-section">
          ${selectedBusinessId ? `
          <div class="address-box">
            <div class="address-title">Bill From</div>
            ${businessData ? `
              <div>
                <div style="font-weight: 600; margin-bottom: 8px;">${businessData.name}</div>
                <div style="margin-bottom: 16px;">
                  ${businessData.address}<br>
                  ${businessData.city}, ${businessData.country} - ${businessData.postal_code}
                </div>
                ${businessData.phone ? `<div>Tel: ${businessData.phone}</div>` : ''}
                ${businessData.email ? `<div>Email: ${businessData.email}</div>` : ''}
              </div>
            ` : ''}
          </div>
          ` : ''}
  
          ${selectedCustomerId ? `
          <div class="address-box">
            <div class="address-title">Bill To</div>
            ${customerData ? `
              <div>
                <div style="font-weight: 600; margin-bottom: 8px;">${customerData.business_name}</div>
                <div style="margin-bottom: 16px;">
                  ${customerData.address}<br>
                  ${customerData.city}, ${customerData.country} - ${customerData.postal_code}
                </div>
                ${customerData.phone_number ? `<div>Tel: ${customerData.phone_number}</div>` : ''}
                ${customerData.email ? `<div>Email: ${customerData.email}</div>` : ''}
              </div>
            ` : ''}
          </div>
          ` : ''}
        </div>
  
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
  getInvoiceEmailTemplate_B
}