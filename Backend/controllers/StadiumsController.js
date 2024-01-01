const Stadium = require('../models/stadiumSchema');

const addStadium = async (req, res) => {
    try {
        const { name, location, capacity, image } = req.body;
        var stadium = await Stadium.find({ name: name });
        console.log(stadium);
        if (stadium.length > 0) {
            return res.status(400).json({ message: 'Stadium already exists' });
        }
        //capacity can't be less than or equal to 0
        //capacity can't be null
        if (capacity <= 0 || capacity == null || capacity == "") {
            return res.status(400).json({ message: 'capacity can not be less than or equal to 0 or Null' });
        }
        stadium = new Stadium({
            name: name,
            location: location,
            capacity: capacity,
            image: image
        });
        await stadium.save();
        res.status(201).json({ message: 'Stadium added successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getStadiums = async (req, res) => {
    try {
        const stadiums = await Stadium.find();
        res.status(200).json(stadiums);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.addStadium = addStadium;
exports.getStadiums = getStadiums;