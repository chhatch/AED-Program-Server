const mongoose = require('mongoose')

const aedMakeSchema = new mongoose.Schema({
    key: {
        type: String,
        enum: [
            'CARDIAC_SCIENCE',
            'DEFIBTECH',
            'HEARTSINE',
            'PHILIPS',
            'PHYSIO_CONTROL',
            'ZOLL',
        ],
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
})

// Duplicate the ID field.
aedMakeSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

// Ensure virtual fields are serialised.
aedMakeSchema.set('toJSON', {
    virtuals: true,
})

const AedMake = mongoose.model('AedMake', aedMakeSchema)

module.exports = AedMake
