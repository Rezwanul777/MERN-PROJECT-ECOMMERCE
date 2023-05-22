const express=require('express');
const { getUser } = require('../controllers/userController');

const userRouter=express.Router();



userRouter.get('/',getUser)

userRouter.get('/profile',(req, res) => {
  
    res.status(200).send({
        messsage:"profile were returened...",
       
    })
})

module.exports = userRouter;

