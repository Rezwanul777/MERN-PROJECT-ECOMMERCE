
const app=require('./app');
const connectDB = require('./config/db');
const { serverPort } = require('./secret'); // import from secret.js



app.listen(5000,async()=>{
    console.log(`server listening on ${serverPort}`); 
    await connectDB()
})