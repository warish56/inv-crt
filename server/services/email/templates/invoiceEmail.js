
const generateInvoiceEmailTemplate = ({
    message,
    invoiceNumber,
    billingDate,
    dueDate,
    dueAmt,
    clientBusinessName,
    senderBusinessName
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Invoice Reminder</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f8f8f8;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #c2185b; margin: 0 0 24px 0; font-size: 24px;">💰 Invoice Reminder</h1>
        
        <p style="font-size: 16px; color: #616161; margin: 0 0 24px 0; white-space:pre-wrap;">
            ${message}
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #616161;">Invoice No:</td>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #212121; font-weight: bold;">${invoiceNumber}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #616161;">Invoice Date:</td>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #212121;">${billingDate}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #616161;">Billed To:</td>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #212121;">${clientBusinessName}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #616161;">Due Date:</td>
                <td style="padding: 12px 0; border-bottom: 2px solid #eeeeee; color: #212121;">${dueDate}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; color: #616161;">Due Amount:</td>
                <td style="padding: 12px 0; color: #c2185b; font-size: 18px; font-weight: bold;">${dueAmt}</td>
            </tr>
        </table>

        <p style="font-size: 16px; color: #616161; margin: 24px 0;">
            Thank you for your business. 🙏
        </p>

        <div style="border-top: 2px solid #eeeeee; padding-top: 24px;">
            <p style="margin: 0; color: #616161;">
                Best regards,<br>
                <strong style="color: #c2185b;">${senderBusinessName}</strong>
            </p>
        </div>
    </div>
</body>
</html>

`

module.exports = {generateInvoiceEmailTemplate}