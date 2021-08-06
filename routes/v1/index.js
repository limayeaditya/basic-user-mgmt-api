const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const routes = require('express').Router()
const authJWT = require('../../middleware/authJWT')
module.exports = () =>  {
    routes.post('/register',require('./register').registerUser())
    routes.post('/login',authJWT.verifyJWT,require('./login').loginUser())
    routes.get('/users',authJWT.verifyJWT,require('./getOtherUsers').getUserDataByName())
    routes.post('/profile',authJWT.verifyJWT,require('./profile').getProfile)
    routes.post('/updateprofile',authJWT.verifyJWT,require('./updateProfile').updateProfile)
    routes.post('/changepassword',authJWT.verifyJWT,require('./changePassword').changePassword)

    return routes
}