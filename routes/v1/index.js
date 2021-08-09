const { request } = require('express')
const express = require('express')
const app = express()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (request,file,cb) => {
        cb(null,'./uploads/')
    },
    filename: (request,file,cb) =>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage:storage})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const routes = require('express').Router()
const authJWT = require('../../middleware/authJWT')
module.exports = () =>  {
    routes.post('/register',upload.single('profileImage'),require('./register').registerUser())
    routes.post('/login',authJWT.verifyJWT,require('./login').loginUser())
    routes.post('/users',authJWT.verifyJWT,require('./getOtherUsers').getUserDataByName())
    routes.get('/profile',authJWT.verifyJWT,require('./profile').getProfile)
    routes.post('/updateprofile',authJWT.verifyJWT,require('./updateProfile').updateProfile)
    routes.post('/changepassword',authJWT.verifyJWT,require('./changePassword').changePassword)

    return routes
}