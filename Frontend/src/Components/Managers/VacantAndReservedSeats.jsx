import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./VacantAndReservedSeats.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function VacantAndReservedSeats() {
  // let Matches = [
  //   0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1,
  //   0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1,
  //   0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
  // ];

  const [matchSeats, setMatchSeats] = useState([]);
  const [Matches, setMatches] = useState([]);

  const [match_, setMatch_] = useState("");

  const color_ = ["#00A300", "#A30000"];
  const status = ["Vacant", "Reserved"];

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      let temp_matches = [];
      for (let i = 0; i < data.length; i++) {
        temp_matches.push
          ([data[i].team1 + " and " + data[i].team2 + " on " + new Date(data[i].datetime).toLocaleDateString() + " at " + new Date(data[i].datetime).toLocaleTimeString(),data[i]._id]);
      }
      console.log(temp_matches);
      setMatches(temp_matches);
    })();

    setMatchSeats([]);
  }, []);
  
  useEffect(() => {
    if(match_ !== ""){
    (async () => {
      let { data } = await axios.get(
        `${Route_}matches/reservedseats/${match_}`
      );
      setMatchSeats(data);
      console.log(data);
    })();
  }
  }, [match_]);


  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          <br />
          <div style={{ width: "600px" }}>
            
            <Dropdown
            
              options={Matches.map(tuple => tuple[0])}
              onChange={(data) => {
                console.log(data);
                const filteredMatches = Matches.filter(tuple => data.value.includes(tuple[0]));
                const ids = filteredMatches.map(([, id]) => id);
                // Matches[data.value]
                
              // onChange={(data) => {
                setMatch_(ids[0]);
              }}
              placeholder="Select Match"
            />
          </div>

          {/* <button type="button" class="btn btn-primary" onClick={handleClick}>
            Show vacant seats for the selected match
          </button> */}
          <div className="container my-5" style={{ margin: "0px !important" }}>
            <div className="row">
              {matchSeats.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="col-md-2 my-3 "
                    id={style_.matchContainer}
                  >
                    <div className="item" id={style_.movies}>
                      <div
                        className={style_.seat}
                        style={{
                          backgroundColor: color_[value],
                          opacity: "0.9",
                        }}
                      >
                        {index + " " + "(" + status[value] + ")"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
