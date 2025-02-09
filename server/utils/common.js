
const formatCurrency = (amount) => {
    const value = Number(Number(amount ?? 0).toFixed(2))
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(value);
    return formattedAmount;
}

module.exports = {
    formatCurrency
}