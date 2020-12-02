const bodyParser = require('body-parser')
const express = require('express')
const testRouter = new express.Router()
const Test = require('./model')

testRouter.get('/', async (req, res) => {
    const test = await Test.findOne({tab: 'ONE'})
    res.send(test.test)
})

testRouter.post('/', bodyParser.text(), async (req, res) => {
    console.log('POST body ', req.body)
    await Test.findOneAndUpdate({tab: 'ONE'}, {test: req.body})
    res.send()
})

module.exports = testRouter
