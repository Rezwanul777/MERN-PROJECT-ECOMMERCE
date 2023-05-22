const express = require('express')
const morgan=require('morgan')

const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const userRouter = require('./routers/userRouter')

const app = express()

const rateLimiter=rateLimit({
    windowMs: 1 * 60 * 1000,// setup one minute
    max:6, // Limit each IP to 6 requests per `window`
    message:"Too many requests from yhis IP. Please try again"
})

// middleware functions
app.use(morgan("dev")) // for development mode--use for http request logger.
app.use(express.json()) // for send data in JSON format
app.use(express.urlencoded({extended:true}))// for sending request in URLencoded format
app.use(xssClean()) // This will sanitize any data in req.body, req.query, and req.params
app.use(rateLimiter) // Apply the rate limiting middleware to all requests



// for testing

app.get('/test', (req, res) => {
    res.status(200).send({
        messsage:"api is running..."
    })
})

app.use("/api/users",userRouter)

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