const createError = require('http-errors')



const getUser=(req, res,next) => {
  try {
    res.status(200).send({
        messsage:"users were returened...",
     
    })
  } catch (error) {
    next(error)
  }
   

}


module.exports={getUser}