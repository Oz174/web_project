import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used styles
import style_ from "./Customer.module.css";
import "./editDataStyling.css";

// used components
import Navbar from "./Navbar";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function EditData() {
  const [First_name, set_First_name] = useState();
  const [Second_name, set_Second_name] = useState();
  const [PWD, setPWD] = useState("");

  const [Role, setRole] = useState("");
  const roleOptions = ["Manager", "Admin", "Fan"];

  const [Birth_Date, set_Birth_Date] = useState(new Date());
  const [day_, setDay_] = useState();
  const [month_, setmonth_] = useState();
  const [year, setyear] = useState();

  const [Gender, setGender] = useState("");
  const genderOptions = ["Male", "Female"];
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
  const [address, setAddress] = useState("");
  //var to show the part of editing data
  const [isEditInfoClicked,setIsEditInfoClicked]=useState(false);


  const [user, setUser] = useState(null);

  const HandleCancel = () => {
    setIsEditInfoClicked(false);
   }


  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}user/${localStorage.getItem("username")}`);
      console.log("username is: "+localStorage.getItem("username"));

      setUser(data);
      console.log(data);
      // setMatches(temp_matches);
    })();

    // setMatchSeats([]);
  }, []);
  const HandleClick = async () => {
    let username = localStorage.getItem("username");
    // username = "manager";
    let bd = "";
    if (year && month_ && day_) {
      bd = year + "/" + month_ + "/" + day_;
    }
    let user = {
      firstName: First_name,
      lastName: Second_name,
      password: PWD,
      // role: Role,
      birthdate: bd,
      // nationality: Nationality,
      // gender: Gender,
    };

    const { data } = await axios.patch(
      `${Route_}user/updateuser/${username}`,
      user
    )
    console.log(username);
    console.log(data);
  //   .then((res)=>{
            
  //     if(res.data.error){
          
  //     }
  //     else{
  //         setProfileData(res.data)
  //         setReady(true);
  //     }
  // })
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
{/*-----------------------print profile data-----------------------*/}

    
    <div className={style_.main_Container}>
        <Navbar />
      <div className="profilePage">
      
        <div className="profileData">
        <div className="HeadersStyle">Your Profile Info.</div>
        <div className="infoWrapper">
          <div>
          <div className="labelData">First Name:</div>
          <label> {user.firstName}</label>
          </div>
          <div>
          <div className="labelData">Last Name:</div>
          <label>{user.lastName}</label>
          </div>
          <div>
          <div className="labelData">Email:</div>
          <label>{user.email}</label>
          </div>
          <div>
          <div className="labelData">BirthDate:</div>
          <label>{user.birthdate}</label>
          </div>
          <div>
          <div className="labelData">City:</div>
          <label>{user.city}</label>
          </div>
          <div>
          <div className="labelData">Address:</div>
          <label>{user.address}</label>
          </div>
          <div>
          <div className="labelData">gender:</div>
          <label>{user.gender}</label>
          </div>
          </div>
          {!isEditInfoClicked&&(<button className="editButton" onClick={()=>setIsEditInfoClicked(true)}>Edit</button>)}
        </div>
        <div className="editData">
      {isEditInfoClicked&&(
      
         <div>
         <div className="HeadersStyle">Change Account Info</div>
        <div className={style_.inner}>
          

          <label>
            First Name 
          </label>
          <input
            className={style_.input}
            placeholder={user.firstName}
            type={"text"}
            onChange={(e) => set_First_name(e.target.value)}
            value={First_name}
          />
          <label>
            Second Name 
          </label>
          <input
            className={style_.input}
            placeholder="Enter Your Second Name"
            type={"text"}
            autoComplete="new-off"
            onChange={(e) => set_Second_name(e.target.value)}
            value={Second_name}
          />
          <label>
            Password
          </label>
          <input
            className={style_.input}
            placeholder="Enter Your Password"
            type={"password"}
            autoComplete="new-password"
            onChange={(e) => setPWD(e.target.value)}
            value={PWD}
          />
          {/*--------------------role part------------------------ */}
          {/* <br />
          <br />
          <Dropdown
            options={roleOptions}
            onChange={(data) => {
              setRole(data.value);
            }}
            placeholder="Role"
          /> */}
          {/*--------------------birthdate part------------------------ */}
          <label>Birth Date</label>
          <DatePicker
            selected={Birth_Date}
            onChange={(date) => {
              set_Birth_Date(date);
              setDay_(date.getDate());
              setyear(date.getFullYear());
              setmonth_(date.getMonth() + 1);
            }}
          />
          {/*--------------------nationality part------------------------ */}
          <br />
          <label>
            City
          </label>
          <Dropdown
                  options={cityOptions}
                  onChange={(data) => {
                    setCity(data.value);
                  }}
                  placeholder="Select City"
                />

          {/*--------------------gender part------------------------ */}
          <label>Gender</label>
          <Dropdown
            options={genderOptions}
            onChange={(data) => {
              setGender(data.value);
            }}
            placeholder="Gender"
          />
          <label>
            Address
          </label>
          <input
            type="text"
            className={style_.input}
            placeholder="Enter Your Address"
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
                />
          <button onClick={HandleClick}>Update Data</button>
          <button onClick={HandleCancel}>Cancel</button>
        </div>
        

      </div>)}
      </div>
    </div>
    </div>
    </div>
  );
}
