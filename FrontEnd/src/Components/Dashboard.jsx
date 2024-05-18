import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./dashboard.css";
import { UserIcon, Logo } from "./svg";

const Dashboard = ({ data }) => {
  const { user, logout } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("option1");

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
                <li><span class="bettorName">John</span> <span class="betAmount">$1000</span></li>
                <li><span class="bettorName">Alice</span> <span class="betAmount">$1500</span></li>
                <li><span class="bettorName">Bob</span> <span class="betAmount">$800</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div id="dashboredBet">
          <button
            className={`radio-button ${selectedOption === 500 ? "selected" : ""}`}
            onClick={() => handleOptionChange(500)}
          >
            $100
          </button>
          <button
            className={`radio-button ${selectedOption === 400 ? "selected" : ""}`}
            onClick={() => handleOptionChange(400)}
          >
            $1000
          </button>
          <button
            className={`radio-button ${selectedOption === 7000 ? "selected" : ""}`}
            onClick={() => handleOptionChange(7000)}
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
            className={`radio-button ${selectedOption === 6600 ? "selected" : ""}`}
            onClick={() => handleOptionChange(6600)}
          >
            $1,000,000
          </button>
          <button
            className={`radio-button ${selectedOption === 200 ? "selected" : ""}`}
            onClick={() => handleOptionChange(200)}
          >
            $10,000,000
          </button>

          <div id="dashboredBetRight">
            <button
              className={`radio-button ${selectedOption === "custom" ? "selected" : ""}`}
              onClick={() => handleOptionChange("custom")}
            >
              CUSTOM
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
