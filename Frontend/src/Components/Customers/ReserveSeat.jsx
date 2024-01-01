import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used style
import style_ from "./Customer.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function ReserveSeat() {
  const [seat_, setSeat_] = useState("");
  const [MatchSeats, setMatchSeats] = useState([]);

  const AvailableSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [Matches, setMatches] = useState([]);
  const [chosenMatch, setChosenMatch] = useState("");

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const handleClick = () => {
    setErrMsg("not complete");
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);

      // setMatches(data);
      console.log(data);
      let temp_matches = [];
      // let temp_matches_with_id = [{ key: "key", value: "value" }];
      for (let i = 0; i < data.length; i++) {
        temp_matches[i] =
          data[i].team1 + " and " + data[i].team2 + " /" + data[i]._id;
      }
      setMatches(temp_matches);
    })();

    setMatchSeats([]);
  }, []);


  useEffect(() => {
    setMatchSeats(AvailableSeats);
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
          {/*-------------------------------------------- */}
          <div style={{ marginTop: "50px" }}></div>

          <br />
          <Dropdown
            options={Matches}
            onChange={(data) => {
              setChosenMatch(data.value.split("/")[1]);
            }}
            placeholder="Select Match"
          />
          <br />
          <Dropdown
            options={MatchSeats}
            onChange={(data) => {
              setSeat_(data.value);
            }}
            placeholder="Select seat ID"
          />
          <br />
          <input
            className={style_.input}
            placeholder="Enter Your credit card number"
          />
          <br />
          <br />
          <input className={style_.input} placeholder="Enter pin number" />
          <br />
          {/*--------------------reserve ticket------------------------ */}
          <br />
          <button onClick={handleClick}>Reserve Seat</button>
        </div>
      </div>
    </div>
  );
}
