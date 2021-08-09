const userServices = require('../../../services/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const secretKey = process.env.secretKey
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const updateProfile = async(request,response)=>{
    const token = request.headers['authorization']
    
    const jwtToken = token.split(' ')[1]
    const decodeUserInfo = jwt.verify(jwtToken,secretKey)
    const emailInToken = decodeUserInfo.email
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone
    console.log(emailInToken,email);
    newUserProfile = userServices.updateUserData(emailInToken,name,email,phone)
    const newToken = jwt.sign({
        name: name,
        email: email
    },secretKey)
    response.status(200).json({
        success: true,
        newToken,newUserProfile
    })

}
module.exports = {
    updateProfile
}