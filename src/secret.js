require('dotenv').config()

const serverPort=process.env.SERVER_PORT || 5002 //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const mongoUrl=process.env.MONGO_URL || "mongodb://localhost:27017/eCommerceMern"

module.exports = {serverPort,mongoUrl}