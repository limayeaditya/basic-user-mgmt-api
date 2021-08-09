const userServices = require('../../../services/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const secretKey = process.env.secretKey
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const changePassword = (request,response)=>{
    const token = request.headers['authorization']
    const jwtToken = token.split(' ')[1]
    const decodeUserInfo = jwt.verify(jwtToken,secretKey)
    const password = request.body.password
    const saltRounds = 10
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(userServices.updatePassword(decodeUserInfo.email,hash)){
            response.status(200).json({
                success: true,
                message:"Password has been changed"
            })
        }else{
            response.status(401).json({
                success: false,
                message:"Error while updating password"
            })
        }
      });
    
    
    
}

module.exports = {
    changePassword
}