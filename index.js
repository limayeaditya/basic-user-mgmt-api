const express = require('express')
const app = express ()
const routesController = require('./routes/v1/')()
const PORT = 5000
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1',routesController)

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})