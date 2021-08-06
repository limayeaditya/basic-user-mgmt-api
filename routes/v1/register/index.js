const userServices = require('../../../services/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const secretKey = process.env.secretKey
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const registerUser = () => {
    return (request,response) => {
        const requestData = request.body
        const name = requestData.name
        const email = requestData.email
        const phone = requestData.phone
        const password = requestData.password
        const id = userServices.registerUser(name,email,phone,password)

        const token = jwt.sign({
            name: name,
            email: email
        },secretKey)

        response.status(200).json({
            success: true,
            token: token
        })
    }
}

module.exports = {
    registerUser
}