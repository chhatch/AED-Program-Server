const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['GLOBAL_ADMIN', 'ORGANIZATION_ADMIN', 'FACILITY_ADMIN', 'USER'],
    },
    aeds: {
        type: Array,
        default: [],
    },
    equipment: Array,
    certifications: Array,
    facility: String,
    organization: String,
    messages: [String],
})

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
