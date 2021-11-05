const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    store: {
        type: String,
        enum: ['AED_MARKET', 'FIRST_AID_MARKET'],
        required: true,
    },
    shopifyId: {
        type: String,
        required: true,
    },
    orderNumber: {
        type: String,
        required: true,
    },
    invoiceId: {
        type: String,
    },
    invoiceNumber: {
        type: String,
    },
    pastDueLetterUrl: {
        type: String,
    },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
