const Match = require("../models/matchSchema");
const Stadium = require("../models/stadiumSchema");

const getMatches = async (req, res) => {
  try {
    // current date
    const matches = (
      await Match.find({ datetime: { $gte: new Date() } })
        .populate("stadium")
        .sort({ datetime: 1 })
    );
    res.status(200).json(matches);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const addMatch = async (req, res) => {
  const { team1, team2, stadium, datetime, lineman1, lineman2, referee } =
    req.body;

  // get the stadium id from the stadium name
  const dbstadium = await Stadium.findOne({ name: stadium }).select({ _id: 1 });
  if (!dbstadium) {
    return res.status(400).json({ message: "stadium not found" });
  }
  //check if staduium is available on the same date
  const match1 = await Match.findOne({
    stadium: dbstadium._id,
    datetime: {
      $gte: new Date(new Date(datetime).getTime() - 2 * 60 * 60 * 1000),
      $lte: new Date(new Date(datetime).getTime() + 2 * 60 * 60 * 1000),
    },
  });
  if (match1) {
    return res.status(400).json({ message: "stadium is not available" });
  }
  //check if team1 or team2 have match on the same date
  const match2 = await Match.findOne({
    $or: [
      { team1: team1, datetime: datetime },
      { team2: team2, datetime: datetime },
    ],
  });
  if (match2) {
    return res
      .status(400)
      .json({ message: "team1 or team2 have match on the same date" });
  }
  // check if the team hadn't previously played a match in the same day 
  const match5 = await Match.findOne({
    $or: [
      { team1: team1, datetime: { $eq: new Date(datetime).getDate() } },
      { team2: team2, datetime: { $eq: new Date(datetime).getDate() } },
    ],
  });
  if (match5) {
    return res
      .status(400)
      .json({ message: "Either team1 or team2 had already played a match before" });
  }

  //team1 and team2 can't be the same
  if (team1 == team2) {
    return res
      .status(400)
      .json({ message: "team1 and team2 can not be the same" });
  }
  //check if the referees and linemen are available on datetime
  const match3 = await Match.findOne({
    $or: [
      { referee: referee, datetime: datetime },
      { lineman1: lineman1, datetime: datetime },
      { lineman2: lineman2, datetime: datetime },
    ],
  });
  if (match3) {
    return res
      .status(400)
      .json({ message: "referee or lineman1 or lineman2 is not available" });
  }

  // hnzwd el sa3teen bto3 GMT+2 
  const datetime2 = new Date(new Date(datetime).getTime() + 2 * 60 * 60 * 1000); 

  const match = new Match({
    team1: team1,
    team2: team2,
    stadium: dbstadium._id,
    datetime: datetime2,
    lineman1: lineman1,
    lineman2: lineman2,
    referee: referee,
  });
  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    if(err.message == "No write concern mode named 'majority'' found in replica set configuration"){
      return res.status(201).json({ message: "Match created" });
    }
    res.status(400).json({ message: err.message });
  }
};

const editMatch = async (req, res) => {
  const { id } = req.params;
  const match = await Match.findById(id);
  var { team1, team2, stadium, datetime, lineman1, lineman2, referee } = match;
  if (!match) {
    return res.status(400).json({ message: "match not found" });
  }
  //check if there are any nulls in the req.body
  for (entry in req.body) {
    if (req.body[entry] == null || req.body[entry] == "") {
      return res.status(400).json({ message: entry + " is required" });
    }
  }
  
  const dbstadium = await Stadium.findOne({ name: req.body.stadium }).select({
      _id: 1,
    });
    if (!dbstadium) {
      return res.status(400).json({ message: "stadium not found" });
    }
    stadium = dbstadium._id;
    //check if staduium is available on the same date
    const match1 = await Match.findOne({
      stadium: dbstadium._id,
      datetime: datetime,
    });
    if (match1) {
      if (match1._id != id) {
        return res.status(400).json({ message: "stadium is not available" });
    }
}
  //team1 and team2 can't be the same
  if (team1 == team2) {
    return res
      .status(400)
      .json({ message: "team1 and team2 can not be the same" });
    }
    
    
    //check if team1 or team2 have match on the same date except the match that we want to edit
    const match2 = await Match.findOne({
        $or: [
            { team1: team1, datetime: datetime },
      { team2: team2, datetime: datetime },
    ],
}).select({ _id: 1 });
if (match2) {
    if (match2._id != id) {
        return res
        .status(400)
        .json({ message: "team1 or team2 have match on the same date" });
    }
}

//check if the referees and linemen are available on datetime
const match4 = await Match.findOne({
    $or: [
        { referee: req.body.referee, datetime: req.body.datetime },
        { lineman1: req.body.lineman1, datetime: req.body.datetime },
        { lineman2: req.body.lineman2, datetime: req.body.datetime },
    ],
});
if (match4) {
    if (match4._id != id) {
        return res
            .status(400)
            .json({ message: "referee or lineman1 or lineman2 is not available" });
    }
}

try {
    //if all null or "" return the same match
    if (
        team1 == match.team1 &&
        team2 == match.team2 &&
        stadium == match.stadium &&
        datetime == match.datetime &&
      lineman1 == match.lineman1 &&
      lineman2 == match.lineman2 &&
      referee == match.referee
      ) {
          return res.status(400).json({ message: "Nothing is changed" });
        }
        const updatedMatch = await Match.updateOne(
            { _id: id },
            {
                $set: {
                    team1: team1,
                    team2: team2,
          stadium: stadium._id,
          datetime: datetime,
          lineman1: lineman1,
          lineman2: lineman2,
          referee: referee,
        },
      }
    );
    if (updatedMatch.modifiedCount == 1) {
      res.status(200).json({ message: "match updated" });
    } else {
      res.status(400).json({ message: "match not updated" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReservedSeats = async (req, res) => {
  const { match_id } = req.params;
  const match = await Match.findById(match_id);
  if (!match) {
    return res.status(400).json({ message: "match not found" });
  }
  reservedSeats = match.reservedSeats;
  // create array of boolean to represent the seats
  var seats = new Array(100);
  for (var i = 0; i < 100; i++) {
    if (reservedSeats.includes(i)) {
      seats[i] = 1;
    } else {
      seats[i] = 0;
    }
  }
  return res.status(200).json(seats);
};

exports.getMatches = getMatches;
exports.addMatch = addMatch;
exports.editMatch = editMatch;
exports.getReservedSeats = getReservedSeats;
