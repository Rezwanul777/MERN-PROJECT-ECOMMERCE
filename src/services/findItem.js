const createHttpError = require('http-errors');
const User=require('../models/userModel');
const {mongoose}=require('mongoose')

const findById=async(id,options={}) => {
    try {
        
        const item=await User.findById(id, options);
        if(!item){
            throw createHttpError(404, 'Item not found with this ID')
        }
        return item

    } catch (error) {
        if(error instanceof mongoose.Error){
            throw createHttpError(404,'invalid item id')
        }
        throw error
    }
}

module.exports ={findById}