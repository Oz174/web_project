import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./Home.module.css";

//import stadiums images
import AlJanoub_Stadium from "./stadiums/aljanoub-stadium.jpg";

//API route
import { Route_ } from "../Route";

export default function Home() {
  // let match = {
  //   team1: "Saudi Arabia",
  //   team2: "Argentina",
  //   stadium: "Al Janoub Stadium",
  //   date: "10/5/2022",
  //   Main_Referee: "Fernando Rapallini",
  //   first_Linesmen: "Wilton Sampaio",
  //   second_Linesmen: "Daniel Siebert",
  // };
  // let Matches = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const [Matches_, setMatches] = useState();
  const egyptianClubNames = [
    ["Al Ahly", "https://semedia.filgoal.com/Photos/Team/Medium/1.png"],
      ["Pyramids", "https://semedia.filgoal.com/Photos/Team/Medium/1451.png"],
      ["Zamalek", "https://semedia.filgoal.com/Photos/Team/Medium/2.png"],
      ["Zed FC", "https://semedia.filgoal.com/Photos/Team/Medium/1683.png"],
      ["Al Masry", "https://semedia.filgoal.com/Photos/Team/Medium/8.png"],
      ["Enppi", "https://semedia.filgoal.com/Photos/Team/Medium/150.png"],
      ["Al Mokawloon Al Arab", "https://semedia.filgoal.com/Photos/Team/Medium/11.png"],
      ["El Ittihad Alexandria", "https://semedia.filgoal.com/Photos/Team/Medium/13.png"],
      ["Farco", "https://semedia.filgoal.com/Photos/Team/Medium/1880.png"],
      ["Smouha", "https://semedia.filgoal.com/Photos/Team/Medium/860.png"],
      ["El Ismaily", "https://semedia.filgoal.com/Photos/Team/Medium/5.png"],
      ["Al Ahly Bank", "https://semedia.filgoal.com/Photos/Team/Medium/2188.png"],
      ["Ceramica Cleopatra", "https://semedia.filgoal.com/Photos/Team/Medium/12723.png"],
      ["Tala'ea El Geish", "https://semedia.filgoal.com/Photos/Team/Medium/304.png"],
      ["Al-Dakhiliya", "https://semedia.filgoal.com/Photos/Team/Medium/904.png"],
      ["Modern Future", "https://semedia.filgoal.com/Photos/Team/Medium/12724.png"],
      ["El Gouna", "https://semedia.filgoal.com/Photos/Team/Medium/617.png"],
      ["Baladeyet El Mahalla", "https://semedia.filgoal.com/Photos/Team/Medium/10.png"]
    ];
  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      setMatches(data);
    })();
  }, []);

  if (Matches_ != undefined) {
    console.log(Matches_);
    return (
      <div className={style_.main_Container}>
        <Navbar />
        <div className={style_['matches-grid']}>
            {Matches_.map((value, index) => {
              return (
                <div
                  key={index}
                  className={style_.matchContainer}
                >
                  <div className="item" id={style_.movies}>
                  <div style={{display:"flex"}}>
                      <div flex="0.2"></div>
                      <div style={{flex:"0.5", textAlign:"center"}}>
                        <img  src={egyptianClubNames.find((club) => club[0] === value.team1)?.[1] || "https://cdn.sportfeeds.io/soccer/images/teams/75x75/uuid_emhtnkgwz4rnno5t1ubxrpnje.png"}></img>
                      </div>
                      <div style={{flex:"0.5",textAlign:"center"}}>
                        <img className="clubsLogogs" src={egyptianClubNames.find((club) => club[0] === value.team2)?.[1] || "https://cdn.sportfeeds.io/soccer/images/teams/75x75/uuid_emhtnkgwz4rnno5t1ubxrpnje.png"}></img>
                        
                        </div>
                    </div>
                    <ul className={style_.list}>
                      <li style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <span style={{color: 'white'}}>{value.team1}</span>
                        <span>VS</span>
                        <span style={{color: 'white'}}>{value.team2}</span> 
                      </li>

                      <li style={{textAlign: 'center'}}>Stadium: <span style={{color: 'white'}}>{value.stadium.name}</span></li>
                      <li style={{textAlign: 'center'}}>Date:  <span style={{color: 'white'}}> {new Date(value.datetime).toLocaleDateString() + " at " + new Date(value.datetime).toLocaleTimeString()}</span></li>
                      <li style={{textAlign: 'center'}}>Main referee:  <span style={{color: 'white'}}> {value.referee} </span></li>
                      <li style={{textAlign: 'center'}}>
                        Linesmen: 
                          <span style={{color: 'white'}}>
                          {` ${value.lineman1} and `}
                          
                          {value.lineman2}
                          </span>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
      </div>
          <br />
        </div>
    );
  }
}