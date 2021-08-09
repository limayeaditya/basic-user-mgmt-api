const userServices = require('../../../services/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
const saltRounds = 10;
const express = require('express')
const app = express()
const secretKey = process.env.secretKey
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const registerUser = () => {
    return (request,response) => {
        console.log(request.file)
        const profileImage = (request.file.path)
        const requestData = request.body
        const name = requestData.name
        const email = requestData.email
        const phone = requestData.phone
        const password = requestData.password
        bcrypt.hash(password, saltRounds, function(err, hash) {
            userServices.registerUser(profileImage,name,email,phone,hash)
          });
        

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