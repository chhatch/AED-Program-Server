const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    test: {
        type: String,
        required: true,
    },
    tab: {
        type: String,
        enum: ['ONE', 'TWO'],
        required: true,
    },
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test
