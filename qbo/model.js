const mongoose = require('mongoose')

const qboCredentialsSchema = new mongoose.Schema({
    store: {
        type: String,
        enum: ['AED_MARKET', 'FIRST_AID_MARKET'],
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
})

const QboCredentials = mongoose.model('QboCredentials', qboCredentialsSchema)

module.exports = QboCredentials
