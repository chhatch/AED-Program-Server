const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, default: null },
    title: { type: String, required: true, default: null },
})
const aedModelSchema = new mongoose.Schema({
    make: {
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
    model: {
        type: String,
        required: true,
    },
    pics: {
        main: { type: String, default: null },
    },
    products: {
        aedMarket: [productSchema],
        firstAidMarket: [productSchema],
    },
    videos: {
        main: { type: String, default: null },
    },
})

// Duplicate the ID field.
aedModelSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

// Ensure virtual fields are serialised.
aedModelSchema.set('toJSON', {
    virtuals: true,
})

const AedModel = mongoose.model('AedModel', aedModelSchema)

module.exports = AedModel
