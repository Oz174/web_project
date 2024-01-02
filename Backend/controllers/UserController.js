const User = require("../models/userSchema");
const Match = require("../models/matchSchema");
const Ticket = require("../models/ticketSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//create a new user
const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      password,
      username,
      email,
      birthdate,
      gender,
      address,
      city,
      role,
    } = req.body;
    console.log(req.body);
    //check if the user already exists
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
      gender: gender,
      role: role,
      address: address,
      city: city,
    });
    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // create a token
    const token = user.generateJWT();
    console.log("token: " + token);
    //save the user
    await user.save();
    return res
      .status(201)
      .header("x-auth-token", token)
      .send({
        message: "Successful User signUp",
        data: { userId: user._id, role: user.role },
        "x-auth-token": token,
      });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //check if the user already exists
    var user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    //check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(203).json({ message: "Invalid Password" });
    }
    //if user is a manager and not approved
    if (user.role == "Manager" && !user.approved) {
      return res.status(203).json({ message: "Manager not approved" });
    }
    // create a token
    const token = user.generateJWT();
    return res
      .status(202)
      .header("x-auth-token", token)
      .send({
        message: "Successful User login",
        data: { userId: user._id, role: user.role },
        "x-auth-token": token,
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const checkUsername = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (!user) {
      return res
        .status(400)
        .json({ bool: "false", message: "User does not exist" });
    }
    return res.status(200).send({ bool: "true", message: "User exists" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      $or: [{ role: "Manager", approved: true }, { role: "Fan" }],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getNonApprovedUsers = async (req, res, next) => {
  try {
    const users = await User.find({ approved: false, role: "Manager" });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(201).send({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const approveUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndUpdate(
      { username: username, role: "Manager" },
      { approved: true }
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist or is not a manager" });
    }
    return res.status(201).send({ message: "User approved" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    var user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    var {
      firstName,
      lastName,
      password,
      birthdate,
    } = user;
    //check if not null or ""
    if (req.body.firstName != null && req.body.firstName != "") {
      firstName = req.body.firstName;
    } else {
      firstName = firstName;
    }
    if (req.body.lastName != null && req.body.lastName != "") {
      lastName = req.body.lastName;
    } else {
      lastName = lastName;
    }
    if (req.body.password != null && req.body.password != "") {
      password = req.body.password;
    } else {
      password = password;
    }
    // if (req.body.role != null && req.body.role != "") {
    //   role = req.body.role;
    // } else {
    //   role = role;
    // }
    if (req.body.birthdate != null && req.body.birthdate != "") {
      birthdate = req.body.birthdate;
    } else {
      birthdate = birthdate;
    }
    // if (req.body.nationality != null && req.body.nationality != "") {
    //   nationality = req.body.nationality;
    // } else {
    //   nationality = nationality;
    // }
    // if (req.body.gender != null && req.body.gender != "") {
    //   gender = req.body.gender;
    // } else {
    //   gender = gender;
    // }
    // if (req.body.creditCardNumber != null && req.body.creditCardNumber != "") {
    //   creditCardNumber = req.body.creditCardNumber;
    // } else {
    //   creditCardNumber = creditCardNumber;
    // }
    //if password changed hash it
    if (password != user.password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }
    user = await User.updateOne(
      { username: username },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          password: password,
          birthdate: birthdate,
        },
      }
    );
    if (user.matchedCount == 0) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(201).send({ message: "User updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const reserve = async (req, res, next) => {
  const { username, match_id } = req.params;
  const { seatNumber, creditCardNumber, creditPinNumber } = req.body;

  let success_message = "";

  if (
    !username ||
    !match_id ||
    !seatNumber ||
    !creditCardNumber ||
    !creditPinNumber
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  //check if the user exists
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  //check if the match exists
  const match = await Match.findById(match_id);
  if (!match) {
    return res.status(400).json({ message: "Match does not exist" });
  }
  //check if the seat is already reserved
  reservedSeats = match.reservedSeats;
  for (i = 0; i < seatNumber.length; i++) {
    if (reservedSeats.includes(seatNumber[i])) {
      return res.status(400).json({ message: "Seat already reserved" });
    }
    // add the seat to the reserved seats
    reservedSeats.push(seatNumber[i]);
  }

  //add the match to the user's matches
  matches = user.matches;
  //if the user has already reserved a ticket for this match
  if (!matches.includes(match_id)) {
    matches.push(match_id);
  }
  // console.log(matches);

  // if user has a ticket for this match add the seats to the ticket
  const ticket = await Ticket.findOne({ match: match_id, user: user._id });
  if (ticket) {
    
    seats = ticket.seat;
    for (i = 0; i < seatNumber.length; i++) {
      seats.push(seatNumber[i]);
    }
    // check if seat numbers exceed five , then abort the operation
    if (seats.length > 5) {
      return res.status(400).json({ message: "You can't reserve more than 5 seats" });
    }

    try {
      await Ticket.updateOne(
        { match: match_id, user: user._id },
        { $set: { seat: seats } }
      );      
    } catch (error) {
      if (
        error.message ==
        "No write concern mode named 'majority'' found in replica set configuration"
      ) {
        success_message += "Ticket Updated, ";
      }
    }
  } else {
    // create a new ticket and save it
    try {
      await Ticket.create({
        match: match_id,
        seat: seatNumber,
        user: user._id,
      });
      success_message += "New ticket reserved , ";
    } catch (error) {
      if (
        error.message ==
        "No write concern mode named 'majority'' found in replica set configuration"
      ) {
        
        success_message += "New ticket reserved, ";
        }
    }
  }

  try {
    await Match.updateOne(
      { _id: match_id },
      { $set: { reservedSeats: reservedSeats } }
    );
  } catch (error) {
    if (
      error.message ==
      "No write concern mode named 'majority'' found in replica set configuration"
    ) {
      success_message += "Match Updated, ";
    }
  }

  try {
    //update the user
    await User.updateOne({ _id: user._id }, { $set: { matches: matches } });
  } catch (error) {
    if (
      error.message ==
      "No write concern mode named 'majority'' found in replica set configuration"
    ) {
      success_message += "User Updated \n";
      res.json({ message: success_message });
    }
  }
};

const getReservations = async (req, res, next) => {
  try {
    const { username, match_id } = req.params;
    if (!username || !match_id) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    //check if the user exists
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //check if the match exists
    const match = await Match.findById(match_id);
    if (!match) {
      return res.status(400).json({ message: "Match does not exist" });
    }
    //check if the user has a ticket for this match
    const ticket = await Ticket.findOne({ match: match_id, user: user._id });
    if (!ticket) {
      return res.status(201).send({ seats: [] });
    }
    //return the seats
    return res.status(201).send({ seats: ticket.seat });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const cancel = async (req, res, next) => {
  try {
    const { username, match_id } = req.params;
    //array of seat numbers
    const { seatNumber } = req.body;
    console.log(!username);
    console.log(!match_id);
    console.log(!seatNumber);
    if (!username || !match_id || !seatNumber.length === 0) {
      return res.status(400).json({ message: "error" });
    }
    //check if the user exists
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //check if the match exists
    const match = await Match.findById(match_id);
    if (!match) {
      return res.status(400).json({ message: "Match does not exist" });
    }
    //check if the seats are reserved by same user
    const ticket = await Ticket.findOne({ match: match_id, user: user._id });
    if (!ticket || !ticket.seat.includes(seatNumber)) {
      return res
        .status(400)
        .json({ message: "Seat is not reserved by this user" });
    }
    // check if the match date is in the coming 3 days
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const matchMonth = match.datetime.getMonth();
    const matchDay = match.datetime.getDate() - 1;
    const matchYear = match.datetime.getFullYear();

    if (matchDay - day <= 3 && matchYear == year && matchMonth == month) {
      return res.status(400).json({ message: "cant cancel within 3 days" });
    }
    if (matchDay < day && matchYear == year && matchMonth == month) {
      return res.status(400).json({ message: "cant cancel after match" });
    }

    //remove the seat from the reserved seats
    reservedSeats = match.reservedSeats;
    //loop through the two arrays and remove the seat
    for (var i = 0; i <= seatNumber.length; i++) {
      if (reservedSeats.includes(seatNumber[i])) {
        reservedSeats.splice(reservedSeats.indexOf(seatNumber[i]), 1);
      }
    }
    matches = user.matches;
    //update the match
    await Match.updateOne(
      { _id: match_id },
      { $set: { reservedSeats: reservedSeats } }
    );
    //update the user
    await User.updateOne(
      { username: username },
      { $set: { matches: matches } }
    );
    // remove deleted seat from ticket
    seats = ticket.seat;
    //loop through the array and remove the seat
    for (var i = 0; i <= seatNumber.length; i++) {
      if (seats.includes(seatNumber[i])) {
        seats.splice(seats.indexOf(seatNumber[i]), 1);
      }
    }
    //if the ticket is empty, delete it
    if (ticket.seat.length == 0) {
      await Ticket.deleteOne({ _id: ticket._id });
    } else {
      await Ticket.updateOne(
        { _id: ticket._id },
        { $set: { seat: ticket.seat } }
      );
    }
    //if the user has no more tickets for this match, remove the match from the user's matches
    const ticket2 = await Ticket.findOne({ match: match_id, user: user._id });
    if (!ticket2) {
      matches = user.matches;
      matches.splice(matches.indexOf(match_id), 1);
      await User.updateOne(
        { username: username },
        { $set: { matches: matches } }
      );
    }
    return res.status(201).send({ message: "Ticket(s) cancelled" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.checkUsername = checkUsername;
exports.getAllUsers = getAllUsers;
exports.getNonApprovedUsers = getNonApprovedUsers;
exports.deleteUser = deleteUser;
exports.approveUser = approveUser;
exports.updateUser = updateUser;
exports.reserve = reserve;
exports.getReservations = getReservations;
exports.cancel = cancel;
