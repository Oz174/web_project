const express = require('express');
const StadiumsController = require('../controllers/StadiumsController');
const router = express.Router();

router.post('/addstadium', async (req, res) => {
    try {
        await StadiumsController.addStadium(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/getstadiums', async (req, res) => {
    try {
        await StadiumsController.getStadiums(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
