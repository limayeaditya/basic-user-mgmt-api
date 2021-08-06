require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const secretKey = process.env.secretKey
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const verifyJWT = (request,response,next)=>{
    const token = request.headers['authorization']
    if(!token){
        response.status(403).json({
            status: 'fail',
            message: 'A token is missing'
        })
    }
    const jwtToken = token.split(' ')[1]
    const decodeUserInfo = jwt.verify(jwtToken,secretKey)
    console.log(decodeUserInfo);
    next()
}

module.exports = {
    verifyJWT
}