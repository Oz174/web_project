import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

//used components
import Navbar from "./Navbar";

//used styles
import style_ from "./Admin.module.css";

export default function NewUsers() {

  let user = {
    name_: "yousef alaa",
    userName: "yousef_332",
    email: "yousef@gmail.com",
    BirthDate: "10/9/2000",
    Gender: "male",
    Nationality: "Egypt",
  };
  // let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];


  const [pendingusers, setPendingUsers] = useState([]);
  const[isAcceptDeleteBtnChange,setIsAcceptDeleteBtnChange]=useState(false);
  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}user/pendingusers
      `);
      console.log(data);
      setPendingUsers(data);
    })();
  }, [isAcceptDeleteBtnChange]);

  if (pendingusers !== undefined) {
    return (
      <div className={style_.mainContainer}>
        <Navbar />
        <table style={{ width: "100%" }}>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>BirthDate</th>
            <th>Gender</th>
            <th>approve authority</th>
          </tr>

          {pendingusers.map((value, index) => {
            return (
              <tr key={index}>
                <td>{`${value.firstName} ${value.lastName}`}</td>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>{value.BirthDate}</td>
                <td>{value.Gender}</td>
                <td >
                  <div className="buttonsAccDel">
                  <div className="btnWrapper">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={async () => {
                      console.log(value.username);
                      setIsAcceptDeleteBtnChange(true);
                      const { data } = await axios
                        .patch(`${Route_}user/approveuser/${value.username}`)
                        .catch(function (error) {
                          console.log(error.response.data); // this is the part you need that catches 400 request
                          alert(error.response.data);
                        });
                      // let { data2 } = await axios.get(
                      //   `${Route_}user/pendingusers`
                      // );
                      // setPendingUsers(data2);
                      console.log(data);
                    }}
                  >
                    Accept
                  </button>
                  </div>
                    <div className="btnWrapper">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={async () => {
                      console.log(value.username);
                      setIsAcceptDeleteBtnChange(true);
                      const { data } = await axios
                        .delete(`${Route_}user/deleteuser/${value.username}`)
                        .catch(function (error) {
                          console.log(error.response.data); // this is the part you need that catches 400 request
                          alert(error.response.data);
                        });
                    }}
                  >
                    Delete
                  </button>
                  </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
