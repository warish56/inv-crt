const puppeteer = require('puppeteer');

const generatePdf = async (htmlContent) => {

    try {
        // Launch Puppeteer in headless mode (default)
        const browser = await puppeteer.launch({
            headless: true, // Ensures no browser UI is opened
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Improves compatibility for some systems
        });

        const page = await browser.newPage();

        // Set the HTML content of the page
        await page.setContent(htmlContent);

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();
        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw {message: 'Failed to generate PDF.' , status: 500}
    }
}

module.exports ={ 
    generatePdf
}