const createError = require('http-errors')
const User=require('../models/userModel');
const { successResponse } = require('./responseController');
const {mongoose}=require('mongoose')

// all users
const getUsers=async(req, res,next) => {
  try {

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5

    // search by name by regular expression

    const searchRegex = new RegExp('.*'+search+".*", 'i'); // that matches the regular expression that means search keyword matches
    const filter={
      isAdmin:{$ne:true},
      $or:[
        {name:{$regex:searchRegex}},// search by name
        {email:{$regex:searchRegex}},//search by email
        {phone:{$regex:searchRegex}},//search by phone
      ]
    }

    const options={password:0}

    // find users
    const users= await User.find(filter,options)
    .limit(limit)
    .skip((page-1)*limit)

    const count=await User.find(filter).countDocuments()

    // no users found

    if(!users) throw createError(404, "User not found")

    return successResponse(res,{
      statusCode:200,
      message:"users were returened. successfully retrieved",
      payload:{
        users,
        paginations:{
          totalPages:Math.ceil(count/limit), // total number of pages
          currentPage:page,
          previousPage:page-1 > 0 ? page-1 :null, // previous page
          nextPage:page+1 <= Math.ceil(count/limit) ? page+1 : null, // nexttatuspage
        }
      }

    })
  } catch (error) {
    next(error)
  }
   
}

// single user

const getUser=async (req,res,next)=>{
  try {
    // find by id of single user
    const id=req.params.id
    const options={password:0}
    const user=await User.findById(id,options)

    // if user not found
    if(!user) {
      throw createError(404, "User not found with id: ")
    }

    return successResponse(res,{
      statusCode:200,
      message:"Single user were returened. successfully retrieved",
      payload:{
        user,
        
      }

    })
  } catch (error) {
    if(error instanceof mongoose.Error) {
      next(createError(400, "invalid user id: "))
      return;
    }
    next(error)
  }
}


module.exports={getUsers,getUser}