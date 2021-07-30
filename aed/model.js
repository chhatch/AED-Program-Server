const mongoose = require('mongoose')

const aedSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    lastInspected: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: '',
    },
    serialNumber: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    pads: {
        expire: Date
    },
    battery: {
        expire: Date
    },
})

// Duplicate the ID field.
aedSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

// Ensure virtual fields are serialised.
aedSchema.set('toJSON', {
    virtuals: true
})

const Aed = mongoose.model('Aed', aedSchema)

module.exports = Aed
