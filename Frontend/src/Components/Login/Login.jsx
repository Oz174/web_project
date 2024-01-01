import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

//API route
import { Route_ } from "../Route";

//used styles
import style_ from "./Login.module.css";

//import images
import img from "../images/Epl110.png";

//main function
export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [LoginRes, setLoginRes] = useState();

  const client = axios.create({
    baseURL: "http://localhost:3000",
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const login_api_function = (username, password) => {
    client
      .post("", {
        username: user,
        password: pwd,
      })
      .then((response) => {
        LoginRes((posts) => [response.data, ...posts]);
      });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let user_ = {
      username: user,
      password: pwd,
    };

    const { data } = await axios
      .post(`${Route_}auth/login`, user_, {
        validateStatus: false,
      })

      .catch(function (error) {
        console.log(error.response.data); // this is the part you need that catches 400 request
        // setErrMsg("User does not exist");
      });
    localStorage.setItem("username", user);
    // let { data } = await axios.post("http://localhost:8000/auth/login", user_);

    console.log(data);

    if (data.message === "Manager not approved") {
      setErrMsg(data.message);
    }
    if (data.message === "Successful User login") {
      console.log(data.data.role);
      if (data.data.role === "Manager") {
        window.open("./MatchesDetails", "_self");
      } else if (data.data.role === "Fan") {
        window.open("./customer/match details", "_self");
      } else if (data.data.role === "Admin") {
        window.open("./allUsers", "_self");
      }
    } else if (data.message === "Invalid Password") {
      setErrMsg("Invalid Password");
    } else if (data.message === "User does not exist") {
      setErrMsg("User does not exist");
    }

    // setUser("");
    // setPwd("");
    // window.open("./", "_self");
  };

  useEffect(() => {
    localStorage.setItem("username", "");
  }, []);

  return (
    <>
      <div className="row" id={style_.main_Container}>
        {/* left part */}
        <div
          className="col-sm col-md col-lg-7 col-md-0 col-sm-0 order-lg-1 order-md-2 order-sm-2 order-2"
          id={style_.image}
        >
          <img src={img} width="100%" height="760px"></img>
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
            <h1>login </h1>
            <form onSubmit={HandleSubmit}>
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              ></input>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                // required
              ></input>

              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
            <p>
              <span className="line">
                <Link to="/signup">Sign Up</Link>
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
