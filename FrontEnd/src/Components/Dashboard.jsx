import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./dashboard.css";
import { UserIcon, Logo } from "./svg";

const Dashboard = ({ data }) => {
  const { user, logout } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [customBet, setCustomBet] = useState(0);
  console.log(customBet);

  // Handler function to update the selected radio button
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div id="dashboredBackGround">
      <div id="dashboredNavbar">
        <Logo />
        <div id="navbarLinks">
          <a href="#" className="nav-link">
            Sports
          </a>
          <a href="#" className="nav-link">
            Stocks
          </a>
          <a href="#" className="nav-link">
            Politics
          </a>
          <a href="#" className="nav-link">
            Enterainment
          </a>
        </div>
        <div id="navbarUserIcon">
          <UserIcon />
        </div>
      </div>
      <div id="navbarUnderline"></div>
      <div className="leftthings">
        <div id="dashboredGraph">
          <div id="dashboredCompareDiv">
            <div id="dashboredCompareTitleDiv">
              <h1>{data.team1.name}</h1>
              <h1>{data.team2.name}</h1>
            </div>
            <div id="dashboredComparePerDiv">
              <div className="chanWinningTxt">
                <h2>{data.team1.chanceOfWinning}%</h2>
                <h4>Chance Of Winning</h4>
              </div>
              <h3>VS</h3>
              <div className="chanWinningTxt">
                <h2>{data.team2.chanceOfWinning}%</h2>
                <h4>Chance Of Winning</h4>
              </div>
            </div>
          </div>
          <div id="topBetters">
            <div id="betterTitle">
              <h1>Top Betters</h1>
              <ul id="bettersList">
                <li>
                  <span className="bettorName">
                    {data.team1.leaderBoard[0].name}
                  </span>
                  <span className="betAmount">
                    {data.team1.leaderBoard[0].bet}
                  </span>
                </li>
                <li>
                  <span className="bettorName">
                    {data.team1.leaderBoard[1].name}
                  </span>
                  <span className="betAmount">
                    {data.team1.leaderBoard[1].bet}
                  </span>
                </li>
                <li>
                  <span className="bettorName">
                    {data.team1.leaderBoard[2].name}
                  </span>
                  <span className="betAmount">
                    {data.team1.leaderBoard[2].bet}
                  </span>
                </li>
                <li>
                  <span className="bettorName">
                    {data.team1.leaderBoard[3].name}
                  </span>
                  <span className="betAmount">
                    {data.team1.leaderBoard[3].bet}
                  </span>
                </li>
                <li>
                  <span className="bettorName">
                    {data.team1.leaderBoard[4].name}
                  </span>
                  <span className="betAmount">
                    {data.team1.leaderBoard[4].bet}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="dashboredBet">
          <button
            className={`radio-button ${selectedOption === 100 ? "selected" : ""}`}
            onClick={() => handleOptionChange(100)}
          >
            $100
          </button>
          <button
            className={`radio-button ${selectedOption === 1000 ? "selected" : ""}`}
            onClick={() => handleOptionChange(1000)}
          >
            $1000
          </button>
          <button
            className={`radio-button ${selectedOption === 10000 ? "selected" : ""}`}
            onClick={() => handleOptionChange(10000)}
          >
            $10,000
          </button>
          <button
            className={`radio-button ${selectedOption === 9000 ? "selected" : ""}`}
            onClick={() => handleOptionChange(9000)}
          >
            $100,000
          </button>
          <button
            className={`radio-button ${selectedOption === 100000 ? "selected" : ""}`}
            onClick={() => handleOptionChange(100000)}
          >
            $1,000,000
          </button>
          <button
            className={`radio-button ${selectedOption === 10000000 ? "selected" : ""}`}
            onClick={() => handleOptionChange(10000000)}
          >
            $10,000,000
          </button>

          <div id="dashboredBetRight">
            <button
              className={`radio-button ${selectedOption === "custom" ? "selected" : ""}`}
              onClick={() => handleOptionChange("custom")}
            >
              <input
                placeholder="Custom"
                onChange={(e) => {
                  setCustomBet(e.target.value);
                }}
              />
            </button>
            <button className="radio-button" id="betBtn">
              Bet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
