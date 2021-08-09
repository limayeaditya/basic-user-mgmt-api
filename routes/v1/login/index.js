const userServices = require('../../../services/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
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
        const validPassword = userServices.loginUser(email,password)
        validPassword.then((result)=>{
            if (result){
            
                response.status(200).json({
                    success: true,
                    message: "Login successful"
                })
            }else{
                response.status(401).json({
                    success:false,
                    message:"Invalid login credentials"
                })
            }
        })
        
        
        
        
       
    }
}

module.exports = {
    loginUser
}