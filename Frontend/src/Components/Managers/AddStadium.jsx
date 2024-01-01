import React, { useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./AddStadium.module.css";
import "./manager.css";

export default function AddStadium() {
  const errRef = useRef();
  const successRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [StadiumName, setStadiumName] = useState("");
  const [StadiumImage, setStadiumImage] = useState("");

  const handleClick = async () => {
    // setErrMsg("Not complete");
    let newStadium = {
      name: StadiumName,
      location: "location",
      capacity: "40",
      image: StadiumImage,
    };
    const { data } = await axios.post(
      `${Route_}stadiums/addstadium`,
      newStadium,
      {
        validateStatus: false,
      }
    );
    if (data.message === "Stadium already exists") {
      setErrMsg(data.message);
      setSuccessMsg("");
    } else if (data.message === "Stadium added successfully") {
      setSuccessMsg(data.message);
      setErrMsg("");
    }
    console.log(data);
  };

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
        <div className="HeadersStyle">Add Stadium</div>
          {/*-------------------- Errors ------------------------ */}
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
          {/*-------------------- successful ------------------------ */}
          <p
            ref={successRef}
            className={successMsg ? "succsessMsg" : style_.offscreen}
          >
            {successMsg}
          </p>
          {/*--------------------stadium part------------------------ */}
          
          <label>Stadium Name</label>
          <input
            type="text"
            placeholder="ex: El Ahly Stadium"
            onChange={(e) => setStadiumName(e.target.value)}
            value={StadiumName}
          ></input>
          <br />
          <br />
          {/*--------------------stadium part------------------------ */}
          {/* <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setStadiumImage(e.target.value);
              console.log(e.target.value);
              console.image(e.target.value);
            }}
            value={StadiumImage}
          /> */}
          <label>Stadium Image</label>
          <input
            type="text"
            placeholder="Image url"
            onChange={(e) => {
              setStadiumImage(e.target.value);
            }}
            value={StadiumImage}
          />
          <br />
          {/*--------------------second Linesmen------------------------ */}
          <br />
          <button onClick={handleClick}>Add Stadium</button>
        </div>
      </div>
    </div>
  );
}
