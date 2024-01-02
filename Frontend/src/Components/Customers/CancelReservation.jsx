import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used style
import style_ from "./Customer.module.css";
import "./editDataStyling.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function CancelReservation() {
  const [seat_, setSeat_] = useState("");
  const [MatchSeats, setMatchSeats] = useState([]);
  const AvailableSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [Matches, setMatches] = useState([]);
  const [chosenMatch, setChosenMatch] = useState("");

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const successRef = useRef();

  const handleClick = async () => {
    // setErrMsg("not complete");

    let cancelationData = {
      username: localStorage.getItem("username"),
      match_id: chosenMatch,
      seatNumber: seat_,
    };
    console.log(cancelationData);
    const { data } = await axios.post(
      `${Route_}reservations/cancel/${localStorage.getItem(
        "username"
      )}/${chosenMatch}`,
      cancelationData,
      { validateStatus: false }
    );
    console.log(data);
    if (data.message === "Ticket(s) cancelled") {
      // setErrMsg(data.message);
      console.log("fol");
      setSuccessMsg("Ticket cancelled");
      setErrMsg("");
    }
    if (data.message === "cant cancel within 3 days") {
      setErrMsg(data.message);
      setSuccessMsg("");
    }
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      console.log("ddd");

      console.log(data);
      let temp_matches = [];
      for (let i = 0; i < data.length; i++) {
        temp_matches.push(
          [data[i].team1 + " and " + data[i].team2 + " on " + new Date(data[i].datetime).toLocaleDateString() + " at " + new Date(new Date(data[i].datetime).getTime()- 2*60*60*1000).toLocaleTimeString(), data[i]._id]);
      }
      setMatches(temp_matches);
    })();

    setMatchSeats([]);
  }, []);

  useEffect(() => {
    setMatchSeats(AvailableSeats);
    setMatchSeats([]);
    if (chosenMatch !== "") {
    (async () => {
      let { data } = await axios.get(
        `${Route_}reservations/getreservations/${localStorage.getItem(
          "username"
        )}/${chosenMatch}`
      );
      setMatchSeats(data.seats);
      console.log(data);
      if (data.message === "Seat is not reserved by this user") {
        setErrMsg("Seat is not reserved by this user");
      }
      })();
    }
  
  }, [chosenMatch]);
  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.inner}>
        <div className="HeadersStyle">Cancel Ticket</div>
          {/*-------------------- Errors ------------------------ */}
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
          {/*------------------success------------------ */}
          <p
            ref={successRef}
            className={successMsg ? "succsessMsg" : style_.offscreen}
          >
            {successMsg}
          </p>
          {successMsg===""&&(<div>
            <Dropdown
              options={Matches.map(tuple => tuple[0])}
              onChange={(data) => {
                console.log(data);
                const filteredMatches = Matches.filter(tuple => data.value.includes(tuple[0]));
                const ids = filteredMatches.map(([, id]) => id);
                console.log("id:"+ids);
                setChosenMatch(ids[0]);
              }}
              placeholder="Select Match"
            />
            <br />
            <Dropdown
              options={MatchSeats.sort((a, b) => a - b)}
              onChange={(data) => {
                setSeat_(data.value);
              }}
              placeholder="Select Seat Number to cancel reservation"
            />
            {/*--------------------reserve ticket------------------------ */}
            <br />
            <button onClick={handleClick}>Cancel Reservation</button>
          </div>)}
        </div>
      </div>
    </div>
  );
}
