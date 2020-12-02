const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/testdb?authSource=admin'
const options = {
    user: 'admin',
    pass: 'badger27',
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

/*
 * Accepts no arguments. Tries only once
 */
const connectDB = () => mongoose.connect(mongoURI, options)

module.exports = connectDB
