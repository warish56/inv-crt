
const generateInvoicePreviewA = ({
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
    fromShippingDetails,
    toShippingDetails,
}) => {
    return `

    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Invoice</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f8f8f8;">
    <div style="max-width: 210mm; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Header -->
        <table style="width: 100%; border-bottom: 2px solid #c2185b; padding-bottom: 24px; margin-bottom: 24px;">
            <tr>
                <td style="width: 60%; vertical-align: top;">
                    <h1 style="color: #c2185b; margin: 0 0 16px 0; font-size: 24px; font-weight: bold;">
                        ${businessData.businessName}
                    </h1>
                    
                    <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                        GSTIN: ${businessData.gstin}
                    </p>
                    
                </td>
                <td style="width: 40%; text-align: right; vertical-align: top;">
                    <h2 style="color: #212121; margin: 0 0 16px 0; font-size: 20px;">INVOICE</h2>
                    <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                        Invoice No: <strong style="color: #212121;">${invoiceId}</strong>
                    </p>
                    <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                        Date: <strong style="color: #212121;">${invoiceDate}</strong>
                    </p>
                    <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                        Due Date: <strong style="color: #212121;">${dueDate}</strong>
                    </p>
                </td>
            </tr>
        </table>

        <!-- Bill From/To -->
        <table style="width: 100%; margin-bottom: 24px;">
            <tr>
                <td style="width: 50%; vertical-align: top; padding-right: 20px;">
                    <h3 style="color: #212121; margin: 0 0 12px 0; font-size: 16px; font-weight: bold;">Bill From</h3>
                    <p style="margin: 4px 0; color: #212121; font-size: 14px; font-weight: 600;">${businessData.name}</p>
                    <p style="margin: 4px 0; color: #616161; font-size: 14px; line-height: 1.5;">
                        ${businessData.address}<br>
                        ${businessData.city}, ${businessData.country} - ${businessData.postal_code}
                    </p>
                </td>
                <td style="width: 50%; vertical-align: top; padding-left: 20px;">
                    <h3 style="color: #212121; margin: 0 0 12px 0; font-size: 16px; font-weight: bold;">Bill To</h3>
                    <p style="margin: 4px 0; color: #212121; font-size: 14px; font-weight: 600;">${customerData.business_name}</p>
                    <p style="margin: 4px 0; color: #616161; font-size: 14px; line-height: 1.5;">
                        ${customerData.address}<br>
                        ${customerData.city}, ${customerData.country} - ${customerData.postal_code}}
                    </p>
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
                <tr style="background-color: #c2185b; color: white;">
                    <th style="padding: 12px; text-align: left; font-size: 14px;"></th>
                    <th style="padding: 12px; text-align: left; font-size: 14px;">Item</th>
                    <th style="padding: 12px; text-align: left; font-size: 14px;">HSN/SAC</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">Price (₹)</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">GST %</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">Total (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${services.map((item, index) => {
                    return (
                        `
                            <tr style="background-color: ${index%2 === 0 ? 'inherit' : '#f5f5f5'};">
                                <td style="padding: 12px; color: #616161;">${index+1}</td>
                                <td style="padding: 12px; color: #212121;">${item.name}</td>
                                <td style="padding: 12px; color: #616161;">${item.code}</td>
                                <td style="padding: 12px; text-align: right; color: #616161;">${item.qty}</td>
                                <td style="padding: 12px; text-align: right; color: #616161;">${item.price}</td>
                                <td style="padding: 12px; text-align: right; color: #616161;">${item.gst}%</td>
                                <td style="padding: 12px; text-align: right; color: #212121; font-weight: bold;">${item.total}</td>
                            </tr>
                        `
                    )})
                }}
            </tbody>
        </table>

        <!-- Totals -->
        <table style="width: 100%; margin-bottom: 24px;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                    
                    <div style="border: 1px solid #e0e0e0; border-radius: 4px; padding: 16px;">
                        <h4 style="color: #212121; margin: 0 0 12px 0; font-size: 14px; font-weight: bold;">Bank Details</h4>
                        <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                            Account Holder: <strong style="color: #212121;">${bankData.holder_name}</strong>
                        </p>
                        <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                            Account Number: <strong style="color: #212121;">${bankData.acc_number}</strong>
                        </p>
                        <p style="margin: 4px 0; color: #616161; font-size: 14px;">
                            IFSC Code: <strong style="color: #212121;">${bankData.ifsc}</strong>
                        </p>
                    </div>
                    
                </td>
                <td style="width: 50%; vertical-align: top;">
                    <div style="background-color: #f5f5f5; border-radius: 4px; padding: 16px;">
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding: 4px 0; color: #616161;">Subtotal:</td>
                                <td style="padding: 4px 0; text-align: right; color: #212121;">${subTotal}</td>
                            </tr>
                           
                            <tr>
                                <td style="padding: 4px 0; color: #616161;">{{label}}:</td>
                                <td style="padding: 4px 0; text-align: right; color: #212121;">{{value}}</td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #c2185b; font-weight: bold;">Total:</td>
                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; text-align: right; color: #c2185b; font-weight: bold;">${totalAmount}</td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>

        
        <div style="padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
            <h4 style="color: #c2185b; margin: 0 0 8px 0; font-size: 14px;">Notes</h4>
            <p style="margin: 0; color: #616161; font-size: 14px; white-space: pre-wrap;">${notes}</p>
        </div>
        
    </div>
</body>
</html>
    
    `
}