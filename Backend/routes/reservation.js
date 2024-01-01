const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.post('/reserve/:username/:match_id',async (req,res,next) => {
    try{
        await UserController.reserve(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }

});
router.post('/cancel/:username/:match_id',async (req,res,next) => {
    try{
        await UserController.cancel(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }

});

router.get('/getreservations/:username/:match_id',async (req,res,next) => {
    try{
        await UserController.getReservations(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
module.exports = router;