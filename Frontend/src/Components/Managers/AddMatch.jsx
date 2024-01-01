import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./AddMatch.module.css";
import "./manager.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import date picker
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";

// import { set } from "mongoose";


export default function AddMatch() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const successRef = useRef();
  const [successMsg, setSuccessMsg] = useState("");

  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const [Stadiums, setStadiums] = useState("");
  const [StadiumsOptions, setStadiumsOptions] = useState([
  ]);
  // const [match_date, set_Match_Date] = useState(new Date);
  // const [day_, setDay_] = useState(0);
  // const [month_, setmonth_] = useState(0);
  // const [year, setyear] = useState(0);
//oreo added
  // const [match_time, set_Match_Time] = useState();
  // const [hour_, setHour_] = useState(0);
  // const [minute_, setMinute_] = useState(0);

  //const [match_date, set_Match_Date] = useState(new Date());

  const [match_datetime, setDateTime] = useState(new Date());

  const [MainReferee, setMainReferee] = useState("");
  const MainRefereeOptions = [
    "Ibrahim Noor El Din",
    "Ahmed El Ghandour",
    "Amin Omar",
    "Mohamed Adel",
    "Mohamed Maroof",
    "Mahmoud El Bana",
    "Mahmoud Naji",
  ];

  const [FirstLinesman, setFirstLinesman] = useState("");
  const FirstLinesmanOptions = [
    "Ahmed Tawfiq Talib",
    "Hossam Taha",
    "Sami Helhel",
    "Mahmoud Abu Raslan",
    "Samir Jamal",
    "Hani Abdel Fattah",
    "Youssef El Basati",
  ];

  const [SecondLinesman, setSecondLinesman] = useState("");
  const SecondLinesmanOptions = [
    "Ahmed Tawfiq Talib",
    "Hossam Taha",
    "Sami Helhel",
    "Mahmoud Abu Raslan",
    "Samir Jamal",
    "Hani Abdel Fattah",
    "Youssef El Basati",
  ];

const egyptianClubNames = [
  "Al Ahly",
  "Pyramids",
  "Zamalek",
  "Zed FC",
  "Al Masry",
  "Enppi",
  "Al Mokawloon Al Arab",
  "El Ittihad Alexandria",
  "Farco",
  "Smouha",
  "El Ismaily",
  "Al Ahly Bank",
  "Ceramica Cleopatra",
  "Tala'ea El Geish",
  "Al-Dakhiliya",
  "Modern Future",
  "El Gouna",
  "Baladeyet El Mahalla"
]

// function hadleClick
  const handleClick = async () => {
    //remove success message if the user wants to add another match untill we check on the data
    setSuccessMsg("");
    //check if all data are correct
    if(homeTeam=="" ){
      setErrMsg("Please select home team");
      return; 
    }
    if(awayTeam=="" ){
      setErrMsg("Please select away team");
      return; 
    }
    if(Stadiums=="" ){
      setErrMsg("Please select stadium");
      return; 
    }
    if(MainReferee=="" ){
      setErrMsg("Please select main referee");
      return; 
    }
    if(FirstLinesman=="" ){
      setErrMsg("Please select first linesman");
      return; 
    }
    if(SecondLinesman=="" ){
      setErrMsg("Please select second linesman");
      return; 
    }
    // do not allow to add match if the match date is less than 5 days from now
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5); // Add 5 days to current date
    console.log(match_datetime.getDate());
    console.log(currentDate.getDate());
    
    console.log(match_datetime> currentDate);
    if(match_datetime< currentDate)
    {
      setErrMsg("Match date must be at least 5 days from now");
      return; 
    }
// all data are correct send request to backend
    let newMatch = {
      team1: homeTeam,
      team2: awayTeam,
      stadium: Stadiums,
      datetime: match_datetime,
      lineman1: FirstLinesman,
      lineman2: SecondLinesman,
      referee: MainReferee,
    };
    // console.log(newMatch);

    const { data } = await axios.post(`${Route_}matches/addmatch`, newMatch, {
      validateStatus: false,
    });
    // .catch(function (error) {
    //   console.log(error.response.data); // this is the part you need that catches 400 request
    //   // setErrMsg("User does not exist");
    // });
    console.log(data);
    // if the data.status is 200 then the match is added successfully
    if (data.status === 200) {
      setSuccessMsg("Match added successfully");
      setErrMsg("");

    } else {
      if(data.message === "No write concern mode named 'majority'' found in replica set configuration"){
        setSuccessMsg("Match added successfully");
      }
      else{
      setErrMsg(data.message);
      }
    }

  };

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
      
        <div className={style_.innerHolder}>
          {/*--------------------Errors------------------------ */}
          <div className="HeadersStyle">Add New Match</div>
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
          <div className={style_.form}>
            <div className={style_.entry}>
              <label>
              Home Team
              </label>
            <Dropdown
              options={egyptianClubNames.filter(team => team !== awayTeam)}
              onChange={(data) => {
                setHomeTeam(data.value);
              }}
              placeholder="Select Team"
            />
            </div>

            <div className={style_.entry}>
              <label>
              Away Team
            </label>
            <Dropdown
              options={egyptianClubNames.filter(team => team !== homeTeam)}
              onChange={(data) => {
                setAwayTeam(data.value);
              }}
              placeholder="Select Team"
            />
            </div>

            <div className={style_.entry}>
            <label>
            Stadium
          </label>
          <Dropdown
            options={StadiumsOptions}
            onChange={(data) => {
              setStadiums(data.value);
            }}
            placeholder="Select stadium"
          />
            </div>

            <div className={style_.entry}>
            <label>Match Date and Time</label>
          <div className="dateTimePicker">
          <DateTimePicker
            onChange={setDateTime}
            value={match_datetime}
          />
          </div>
            </div>

            <div className={style_.entry}>
            <label>
            Main Referee
          </label>
          <Dropdown
            options={MainRefereeOptions}
            onChange={(data) => {
              setMainReferee(data.value);
            }}
            placeholder="Select Referee"
          />
            </div>


            <div className={style_.entry}>
            <label>
            First Linesman
          </label>
          <Dropdown
            options={FirstLinesmanOptions.filter(linesman => linesman !== SecondLinesman)}
            onChange={(data) => {
              setFirstLinesman(data.value);
            }}
            placeholder="Select Linesman"
          />
            </div>
            

            <div className={style_.entry}>
            <label>
            Second Linesman
          </label>
          <Dropdown
            options={SecondLinesmanOptions.filter(linesman => linesman !== FirstLinesman)}
            onChange={(data) => {
              setSecondLinesman(data.value);
            }}
            placeholder="Select Linesman"
          />
            </div>

          </div>
          
          
          {/*--------------------Stadium part------------------------ */}
          
          
          {/*--------------------DateTime part------------------------ */}
          

          {/*--------------------main referee------------------------ */}
          
          {/*--------------------first Linesmen------------------------ */}
          
          {/*--------------------second Linesmen------------------------ */}
         
          
          {/*--------------------second Linesmen------------------------ */}
          <div >
            <button className="buttonSumbit"  onClick={handleClick}>Add Match</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
