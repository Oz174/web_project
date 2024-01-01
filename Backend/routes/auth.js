const express = require('express');
const router = express.Router();
const {validationResult } = require('express-validator');
const {validateDOB,validateEmail,validatefirstName,validatelastName,validateUsername,validatePassword} = require('../controllers/validators');

const UserController = require('../controllers/UserController');

 router.post('/signup',[validateDOB,validateEmail,validatefirstName,validatelastName,validateUsername,validatePassword],
 async (req,res,next) => {
   try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).send(errors.array());
    }
        await UserController.createUser(req,res,next);
   }catch(err){
     res.status(400).json({message:err.message});
   }   
 });

 router.post('/login',async (req,res,next)=>{
  try{
    await UserController.loginUser(req,res,next);
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
    
 });
 module.exports = router;
