const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['GLOBAL_ADMIN', 'ADMIN', 'USER'],
    },
    equipment: [String],
    organization: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User
