const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const routes = require('express').Router()
const authJWT = require('../../middleware/authJWT')
module.exports = () =>  {
    routes.post('/register',require('./register').registerUser())
    routes.post('/login',authJWT.verifyJWT,require('./login').loginUser())
    routes.get('/user',authJWT.verifyJWT,require('./getOtherUsers').getUserDataByName())
    return routes
}