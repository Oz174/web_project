const express = require('express');
const MatchesController = require('../controllers/MatchesController');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await MatchesController.getMatches(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/addmatch', async (req, res) => {
    try {
        await MatchesController.addMatch(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/editmatch/:id', async (req, res) => {
    try {
        await MatchesController.editMatch(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/reservedseats/:match_id', async (req ,res)=>{
    try{
        await MatchesController.getReservedSeats(req,res);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;
