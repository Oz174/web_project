const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    stadium: { type: mongoose.Schema.Types.ObjectId, ref: "Stadiums" },
    team1: { type: String, required: true, trim: true },
    team2: { type: String, required: true, trim: true },
    datetime: { type: Date, required: true},
    referee: { type: String, required: true },
    lineman1: { type: String, required: true },
    lineman2: { type: String, required: true },
    reservedSeats: [{ type: Number }],
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
