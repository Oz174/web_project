import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./EditMatches.module.css";
import "./manager.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import date picker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";

export default function EditMatches() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const successRef = useRef();
  const [MainReferee, setMainReferee] = useState("");
  const [Matches, setMatches] = useState([]);
  const [Stadiums, setStadiums] = useState("");
  const [allMatchesDetails, setAllMatchesDetails] = useState([]);
  const [FirstLinesman, setFirstLinesman] = useState("");
  const [SecondLinesman, setSecondLinesman] = useState("");
  const [StadiumsOptions, setStadiumsOptions] = useState([]);

  const [match_datetime, setDateTime] = useState(new Date());
  // const [Match_Date, set_Match_Date] = useState(new Date());
  // const [day_, setDay_] = useState("");
  // const [month_, setmonth_] = useState("");
  // const [year, setyear] = useState("");
  //oreo addition
  // const [MatchTime, setMatchTime] = useState("");
  // const [hour_, setHour_] = useState("");
  // const [minute_, setMinute_] = useState("");
  const [MatchSeats, setMatchSeats] = useState([]);
  const [chosenMatch, setChosenMatch] = useState("");
  const MainRefereeOptions = [
    "Ibrahim Noor El Din",
    "Ahmed El Ghandour",
    "Amin Omar",
    "Mohamed Adel",
    "Mohamed Maroof",
    "Mahmoud El Bana",
    "Mahmoud Naji",
  ];

  const FirstLinesmanOptions = [
    "Ahmed Tawfiq Talib",
    "Hossam Taha",
    "Sami Helhel",
    "Mahmoud Abu Raslan",
    "Samir Jamal",
    "Hani Abdel Fattah",
    "Youssef El Basati",
  ];


  const SecondLinesmanOptions = [
    "Ahmed Tawfiq Talib",
    "Hossam Taha",
    "Sami Helhel",
    "Mahmoud Abu Raslan",
    "Samir Jamal",
    "Hani Abdel Fattah",
    "Youssef El Basati",
  ];

const matchMock={
  stadium: "Cairo International Stadium",
  datetime: new Date("2021-05-20T19:00:00.000Z"),
  lineman1: "Ahmed Tawfiq Talib",
  lineman2: "Hossam Taha",
  referee: "Ibrahim Noor El Din",
}

  const updateStates = () => {
    setStadiums(matchMock.stadium);
    setDateTime(matchMock.datetime);
    setMainReferee(matchMock.referee);
    setFirstLinesman(matchMock.lineman1);
    setSecondLinesman(matchMock.lineman2);
}

  const handleClick = async () => {
    setSuccessMsg("");
    console.log("succssess msg"+successMsg);
    // do not allow to edit match date if new date is less than 5 days from now
    // const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 5); // Add 5 days to current date
    // console.log(match_datetime.getDate());
    // console.log(currentDate.getDate());
    // console.log(match_datetime> currentDate);
    // if(match_datetime< currentDate)
    // {
    //   setErrMsg("Match date must be at least 5 days from now");
    //   return; 
    // }
    // let tempDate = year + "/" + month_ + "/" + day_;
    // //console.log(day_);
    // if (year.length === 0) {
    //   tempDate = 0;
    // }

    // // //oreo added
    // // let time = hour_ + ":" + minute_;
    // // if (hour_.length === 0) {
    // //   time = 0;
    // // }
    // // tempDate = new Date(tempDate + " " + time);

    let updatedMatch = {
      stadium: Stadiums,
      datetime: match_datetime, //oreo edited
      lineman1: FirstLinesman,
      lineman2: SecondLinesman,
      referee: MainReferee,
    };

    if (chosenMatch.length > 0) {
      const { data } = await axios.patch(
        `${Route_}matches/editmatch/${chosenMatch}`,
        updatedMatch,
        { validateStatus: false }
      );
      console.log(data);
      if (data.message !== "match updated") {
        setErrMsg(data.message);
      } else if (data.message === "match updated") {
        setSuccessMsg("match updated");
        setErrMsg("");
      }
    } else {
      setErrMsg("chose match");
    }
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      setAllMatchesDetails(data);
      axios
        .get(`${Route_}stadiums/getstadiums`)
        .then((response) => {
          // console.log(response.data);
          let res = response.data;
          let arr = [];
          for (let i = 0; i < res.length; i++) {
            arr.push(res[i].name);
          }
          setStadiumsOptions(arr);
          console.log(arr);
        });

      let temp_matches = [];
      for (let i = 0; i < data.length; i++) {
        temp_matches.push
          ([data[i].team1 + " and " + data[i].team2 + " on " + new Date(data[i].datetime).toLocaleDateString() + " at " + new Date(data[i].datetime).toLocaleTimeString(), data[i]._id]);
      }
      setMatches(temp_matches);
      console.log("matches iii");
      console.log(Matches);
    })();

    setMatchSeats([]);
  }, []);

  //fill the states with its initial values when the user selects a match
  useEffect(() => {
    (async () => {
      //search in Matches for the chosen match
      if (chosenMatch.length === 0) return;
      const matchDetails = allMatchesDetails.filter(match => match._id === chosenMatch);
      console.log(matchDetails);
      //fill the states with the match details
      const updateStates = () => {
        setStadiums(matchDetails[0].stadium);
        setDateTime(new Date(matchDetails[0].datetime));
        // set_Match_Date(new Date(matchDetails[0].date));
        // setDay_(new Date(matchDetails[0].date).getDate() + 1);
        // setyear(new Date(matchDetails[0].date).getFullYear());
        // setmonth_(new Date(matchDetails[0].date).getMonth() + 1);
        setMainReferee(matchDetails[0].referee);
        // set_Match_Time(new Date(matchDetails[0].date));
        // setHour_(new Date(matchDetails[0].date).getHours());
        // setMinute_(new Date(matchDetails[0].date).getMinutes());
        setFirstLinesman(matchDetails[0].lineman1);
        setSecondLinesman(matchDetails[0].lineman2);
      }

      // Update state after fetching data
      await updateStates();
      console.log(Stadiums);
      console.log(match_datetime);
      console.log(MainReferee);
      console.log(FirstLinesman);
      console.log(SecondLinesman);


    })();
  }, [chosenMatch]);

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
      <div className={style_.innerHolder}>
          {/*-------------------- Errors ------------------------ */}
          <div className="HeadersStyle">Edit Match</div>
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
          
          {/*------------------success------------------ */}
          
          <p
            ref={successRef}
            className={successMsg!=="" ? "succsessMsg" : style_.offscreen} 
          >
            {successMsg}
          </p>
          {/*--------------------Match part------------------------ */}
          <label>
            Match
          </label>
          <Dropdown
            options={Matches.map(tuple => tuple[0])}
            onChange={(data) => {
              console.log(data);
              const filteredMatches = Matches.filter(tuple => data.value.includes(tuple[0]));
              const ids = filteredMatches.map(([, id]) => id);
              // Matches[data.value]

              // onChange={(data) => {
              setChosenMatch(ids[0]);
            }}
            placeholder="Select Match"
          />

          {/*--------------------Stadium part------------------------ */}
          {chosenMatch!=="" && (<div>
          <label>
            Stadium
          </label>
          <Dropdown
            options={StadiumsOptions}
            defaultValue={Stadiums}
            onChange={(data) => {
              setStadiums(data.value);
            }}
            placeholder={matchMock.stadium}
          />
          {/*--------------------Date part------------------------ */}
          <label>Match Date and Time</label>
          <div className="dateTimePicker">
          <DateTimePicker
            onChange={setDateTime}
            value={match_datetime===new Date() ? matchMock.datetime : match_datetime}
          />
          </div>
          {/*-------------------- Time part------------------------ */}
          {/* <label>Match Time</label>
          <TimePicker
            onChange={(time) => {
              set_Match_Time(time);
              setHour_(time.hour());
              setMinute_(time.minute());
            }} /> */}
          {/*--------------------main referee------------------------ */}
          <label>
            Main Referee
          </label>

          <Dropdown
            options={MainRefereeOptions}
            defaultValue={MainReferee}
            onChange={(data) => {
              setMainReferee(data.value);
            }}//{MainReferee === "" ? "Select the main referee" : MainReferee}
            placeholder={matchMock.referee}
          />
          {/*--------------------first Linesmen------------------------ */}
          <label>
            First Linesmen
          </label>
          <Dropdown
            options={FirstLinesmanOptions.filter(linesman => linesman !== SecondLinesman)}
            defaultValue={FirstLinesman}
            onChange={(data) => {
              setFirstLinesman(data.value);
            }}
            placeholder={matchMock.lineman1}
          />
          {/*--------------------second Linesmen------------------------ */}
          <label>
            Second Linesmen
          </label>
          <Dropdown
            options={SecondLinesmanOptions.filter(linesman => linesman !== FirstLinesman)}
            defaultValue={SecondLinesman}
            onChange={(data) => {
              setSecondLinesman(data.value);
            }}
            placeholder={matchMock.lineman2}
          />
          {/*--------------------second Linesmen------------------------ */}
          <br />
          <button className="buttonSumbit" onClick={handleClick}>Edit Match</button>
          </div>)}
        </div>
      </div>
    </div>
  );
}
