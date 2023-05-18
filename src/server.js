const express = require('express')
const morgan=require('morgan')
const app = express()

// for development mode--use for http request logger.

app.use(morgan("dev"))

// for testing

app.get('/test', (req, res) => {
    res.status(200).send({
        messsage:"api is running..."
    })
})


app.listen(5000,()=>{
    console.log("server listening on 5000");
})