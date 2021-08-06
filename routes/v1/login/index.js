const userServices = require('../../../services/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const secretKey = process.env.secretKey
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const loginUser = () => {
    return (request,response) => {
        const requestData = request.body
        const email = requestData.email        
        const password = requestData.password
        const user = userServices.loginUser(email,password)
        
        if (user.length >1){
            const token = jwt.sign({
                name: user.name,
                email: email
            },secretKey)
            response.status(200).json({
                success: true,
                token,
                message: user
            })
        }else{
            response.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        
        
       
    }
}

module.exports = {
    loginUser
}