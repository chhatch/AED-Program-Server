const express = require('express')
const userRouter = new express.Router()
const User = require('./model')

userRouter.get('/', async (req, res) => {
    const email = req.query['email']
    let user = await User.findOne({ email }).lean()

    if (user) {
        //is sending user._id a security risk?
        res.json(user)
    } else {
        res.status(404).send()
    }
})

//this will partially update or completely overwrite an existing user
userRouter.post('/', express.json(), async (req, res) => {
    try {
        const user = req.body
        console.log('POST user ', user)
        const userExists = await User.findOneAndUpdate({ email: user.email }, user, {lean: true})
        if (userExists) {
            res.send()
        } else {
        res.status(404).send()
        }
    } catch (e) {
        console.log('Error', e)
        res.status(500).send()
    }
})

module.exports = userRouter
