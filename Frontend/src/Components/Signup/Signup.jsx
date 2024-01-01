import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//used styles
import style_ from "./Signup.module.css";

//API route
import { Route_ } from "../Route";

//import images
import img from "../images/Epl110.png";

//import date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import coutry picker
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

// import fontawesome
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { data } from "jquery";

export default function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false); // is name valid or not
  const [userFocus, setUserFocus] = useState(false); // do we have focus on user input field or not

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false); // is password valid or not
  const [PwdFocus, setPwdFocus] = useState(false); // do we have focus on password input field or not

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false); // is match password = password or not
  const [matchFocus, setMatchFocus] = useState(false); // do we have focus on match password input field or not

  const [Email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");

  const [Birth_Date, set_Birth_Date] = useState(new Date());
  const [day_, setDay_] = useState("");
  const [month_, setmonth_] = useState("");
  const [year, setyear] = useState("");

  const [Gender, setGender] = useState("");
  const genderOptions = ["Male", "Female"];

  const [Role, setRole] = useState("");
  const roleOptions = ["Manager", "Admin", "Fan"];

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const cityOptions = [
    "Alexandria",
    "Assiut",
    "Aswan",
    "Beheira",
    "Bani Suef",
    "Cairo",
    "Daqahliya",
    "Damietta",
    "Fayyoum",
    "Gharbiya",
    "Giza",
    "Helwan",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Marsa Matrouh",
    "Minya",
    "Monofiya",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalioubiya",
    "Qena",
    "Red Sea",
    "Sharqiya",
    "Sohag",
    "South Sinai",
    "Suez",
    "Tanta"
  ];
  //a variable to store the current year to check for age of the user
  const yearNow=new Date().getFullYear();
  const [step1_desp, setStep1_desp] = useState("");
  const [step2_desp, setStep2_desp] = useState("none");

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // to validate the user name
  // starts with lower case or upper case letter
  // followed by 3 to 23 letters
  // upper case or lower case letters or - or _

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // to validate the password
  //atlest one lowercase letter and one uppercase letter one digit(0:9) and one special character

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // to validate the email

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // to check every time the user changed if it's valid or not
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  // to check every time the email changed if it's valid or not
  useEffect(() => {
    const result = EMAIL_REGEX.test(Email);
    setValidEmail(result);
  }, [Email]);

  // to check every time the pwd or match pwd change if password valid and if password = matched password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd && pwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //for testing
  useEffect(() => {
    // console.log(day_ + "/" + month_ + "/" + year);
  }, [Birth_Date]);
  useEffect(() => {
    // console.log(Gender);
  }, [Gender]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let temp_day = String(day_);
    let temp_month = String(month_);
    if (day_ && temp_day.length === 1) {
      setDay_("0" + temp_day);
    }
    if (month_ && temp_month.length === 1) {
      setmonth_("0" + temp_month);
    }
    console.log(temp_day.length);
    console.log(year + "/" + month_ + "/" + day_);
    let user_ = {
      firstName: first_name,
      lastName: last_name,
      username: user,
      password: pwd,
      email: Email,
      birthdate: year + "/" + month_ + "/" + day_,
      gender: Gender,
      role: Role,
      address: address,
      city: city,
    };
    console.log(Role);
    console.log(validName && validPwd && validMatch && year && Role && Gender && city && address);
    
    //if the user is younger than 12 years old
    if(yearNow-year<12){
      setErrMsg("You are too young to register, please ask your parents to register for you");
      return;
    }
    if (validName && validPwd && validMatch && year && Role && Gender && city) {
      console.log(year);
      let { data } = await axios.post(
        `${Route_}auth/signup`,
        user_,
        { validateStatus: false }
      );
      console.log(data);
      localStorage.setItem("username", user);
      if (data.message === "Successful User signUp") {
        if (data.data.role === "Manager") {
          window.open("./login", "_self");
        } else if (data.data.role === "Fan") {
          window.open("./customer/match details", "_self");
        } else if (data.data.role === "Admin") {
          window.open("./allUsers", "_self");
        }
        // setUser("");
        // setPwd("");
        // setMatchPwd("");
      } else if (!pwd || !matchPwd) {
        setErrMsg("Enter password and match password");
      } else if (!year) {
        setErrMsg("Enter your birthdate");
      } else if (!Role) {
        setErrMsg("Enter your role");
      } else if (!Gender) {
        setErrMsg("Enter your gender");
      }
      else if(! city){
        setErrMsg("Enter your city");
      }
    }
  };

  return (
    <>
      <div className="row" id={style_.main_Container}>
        {/* left part */}
        <div
          className="col-sm col-md col-lg-7 col-md-0 col-sm-0 order-lg-1 order-md-2 order-sm-2 order-2"
          id={style_.image}
        >
          <img src={img} width="100%" height="760x"></img>
        </div>
        {/* right part */}
        <div
          className="col-sm col-md col-lg-5 col-md-12 col-sm-12 order-lg-2 order-md-1 order-sm-1 order-1"
          id={style_.form}
        >
          <section>
            <p
              ref={errRef}
              className={errMsg ? style_.errMsg : style_.offscreen}
            >
              {errMsg}
            </p>
            <h1>Sign Up</h1>
            <form>
              <form style={{ display: step1_desp }}>
                {/*-------------------- first and last name part------------------------ */}
                <label>
                  First name*
                  <span className={first_name ? style_.valid : style_.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </label>
                <input
                  type="text"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => set_first_name(e.target.value)}
                  value={first_name}
                  required
                />
                <label>
                  Last name*
                  <span className={last_name ? style_.valid : style_.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => set_last_name(e.target.value)}
                  value={last_name}
                  required
                />

                {/*-------------------- user name part------------------------ */}
                <label htmlFor="username">
                  Username*
                  <span className={validName ? style_.valid : style_.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validName || !user ? style_.hide : style_.invalid
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  className={
                    userFocus && user && !validName
                      ? style_.instructions
                      : style_.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                {/*-------------------- email part------------------------ */}
                <label>
                  Email*
                  <span className={validEmail ? style_.valid : style_.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validEmail || !Email ? style_.hide : style_.invalid
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  required
                />
                <p
                  className={
                    EmailFocus && Email && !validEmail
                      ? style_.instructions
                      : style_.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  You Entered invalid email.
                </p>
                {/*--------------------city part------------------------ */}
                
                {/* <CountryDropdown
                  style={{ height: "40px" }}
                  value={Nationality}
                  onChange={(data) => setNationality(data)}
                /> */}
                <label>
                  City*
                </label>
                <Dropdown
                  options={cityOptions}
                  onChange={(data) => {
                    setCity(data.value);
                  }}
                  placeholder="Select City"
                />  
                {/*--------------------btns part------------------------ */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    console.log(user);
                    let user_data = { username: user, email: Email };
                    let user_exist = true;

                    const { data } = await axios.post(
                      `${Route_}user/checkusername`,
                      user_data,
                      { validateStatus: false }
                    );
                    // .catch(function (error) {
                    //   console.log(error.response.data); // this is the part you need that catches 400 request
                    //   data.message = error.response.data;
                    // });

                    console.log(data.message);
                    if (
                      first_name &&
                      last_name &&
                      user &&
                      validName &&
                      validEmail &&
                      Email &&
                      city &&
                      data.message === "User does not exist"
                    ) {

                      setStep1_desp("none");
                      setStep2_desp("");
                      setErrMsg("");
                    } else if (!validName) {
                      setErrMsg("Enter valid username");
                    } else if (!validEmail) {
                      setErrMsg("Enter valid email");
                    } else if (data.message === "User exists") {
                      setErrMsg(data.message);
                    } else {
                      setErrMsg("all fields are required");
                    }
                  }}
                >
                  Next
                </button>
              </form>
              <form style={{ display: step2_desp }}>
                {/*-------------------- password part------------------------ */}
                <label htmlFor="password">
                  Password*
                  <span className={validPwd ? style_.valid : style_.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validPwd || !pwd ? style_.hide : style_.invalid}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                ></input>
                <p
                  className={
                    PwdFocus && !validPwd
                      ? style_.instructions
                      : style_.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
                {/*-------------------- match password part------------------------ */}
                <label htmlFor="confirm_pwd">
                  confirm password*
                  <span className={validMatch ? style_.valid : style_.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validMatch || !matchPwd ? style_.hide : style_.invalid
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={matchPwd ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? style_.instructions
                      : style_.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field
                </p>
                {/*--------------------birthdate part------------------------ */}
                <label>Birth Date*</label>
                <DatePicker
                  selected={Birth_Date}
                  onChange={(date) => {
                    set_Birth_Date(date);
                    setDay_(date.getDate());
                    setyear(date.getFullYear());
                    setmonth_(date.getMonth() + 1);
                  }}
                />
                {/*--------------------role part------------------------ */}
                <br />
                <Dropdown
                  options={roleOptions}
                  onChange={(data) => {
                    setRole(data.value);
                  }}
                  placeholder="Role"
                />
                {/*--------------------gender part------------------------ */}
                <br />
                <Dropdown
                  options={genderOptions}
                  onChange={(data) => {
                    setGender(data.value);
                  }}
                  placeholder="Gender"
                />
                {/*--------------------address part------------------------ */}
                <label>
                  Address (optional)
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {/*--------------------btns part------------------------ */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (first_name && last_name && user && Email) {
                      setStep1_desp("");
                      setStep2_desp("none");
                    } else {
                      alert("all fields are required");
                    }
                  }}
                >
                  previous
                </button>
                <button onClick={HandleSubmit} className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </form>
            <p>
              <span className="line">
                <Link to="/login">Login</Link>
                <br />
                <Link to="/home">Enter as a guest</Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
