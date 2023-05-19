const express = require('express')
const morgan=require('morgan')
const createError = require('http-errors')
const app = express()

// middleware functions
app.use(morgan("dev")) // for development mode--use for http request logger.
app.use(express.json()) // for send data in JSON format
app.use(express.urlencoded({extended:true}))// for sending request in URLencoded format




// for testing

app.get('/test', (req, res) => {
    res.status(200).send({
        messsage:"api is running..."
    })
})

app.get('/api/userProfile',(req, res) => {
  
    res.status(200).send({
        messsage:"This is userProfile..."
    })
})

// client error handeling

app.use((req,res,next)=>{
    
    next(createError(404,"user not found"))
})

// server error handling-- all error handeling in server side

app.use((err,req,res,next)=>{
    return res.status(err.status||500).json({
        success:false,
        message:err.message
    })
})

module.exports=app