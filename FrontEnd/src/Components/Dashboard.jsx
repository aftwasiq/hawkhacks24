import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import "./dashboard.css";
import { UserIcon, Logo } from "./svg";
import * as nearAPI from "near-api-js";
import axios from "axios";
import { Buffer } from "buffer"; // Import Buffer

const { connect, keyStores, WalletConnection, utils } = nearAPI;

const nearConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  appKeyPrefix: "my-app",
};

const Dashboard = ({ data }) => {
  const { user, logout } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [customBet, setCustomBet] = useState(0);
  const [team1Goals, setTeam1Goals] = useState(0);
  const [team2Goals, setTeam2Goals] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [betResult, setBetResult] = useState(null);

  useEffect(() => {
    window.Buffer = Buffer; // Polyfill Buffer for browser
    const initNear = async () => {
      try {
        const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
        const nearConnection = await connect({
          networkId: nearConfig.networkId,
          keyStore: myKeyStore,
          nodeUrl: nearConfig.nodeUrl,
          walletUrl: nearConfig.walletUrl,
          helperUrl: nearConfig.helperUrl,
        });
        const walletConnection = new WalletConnection(
          nearConnection,
          nearConfig.appKeyPrefix,
        );
        setWallet(walletConnection);

        if (walletConnection.isSignedIn()) {
          const account = walletConnection.account();
          setAccount(account);
          localStorage.setItem("nearAccountId", account.accountId);
        } else {
          const storedAccountId = localStorage.getItem("nearAccountId");
          if (storedAccountId) {
            const account = walletConnection.account();
            setAccount(account);
          }
        }
      } catch (error) {
        console.error("Error initializing NEAR:", error);
      }
    };

    initNear();
  }, []);

  const signIn = () => {
    if (wallet) {
      wallet
        .requestSignIn({
          contractId: "",
          methodNames: [],
          successUrl: `${window.location.origin}/dashboard`,
          failureUrl: `${window.location.origin}/dashboard`,
        })
        .then(() => {
          console.log("Sign-in request successful");
        })
        .catch((error) => {
          console.error("Error during sign-in request:", error);
        });
    } else {
      console.error("Wallet is not initialized");
    }
  };

  const signOut = () => {
    if (wallet) {
      wallet.signOut();
      setAccount(null);
      localStorage.removeItem("nearAccountId");
    } else {
      console.error("Wallet is not initialized");
    }
  };

  const fetchBetResults = async () => {
    try {
      const response = await axios.post("http://localhost:5001/bet", {
        team1: "ARGENTINA",
        team2: "SAUDI ARABIA",
        goals_team1: team1Goals,
        goals_team2: team2Goals,
        accountId: account ? account.accountId : "",
        selectedTeam,
        betAmount: customBet || selectedOption,
      });
      setBetResult(response.data);
    } catch (error) {
      console.error("Error fetching bet results:", error);
    }
  };

  const handlePay = async () => {
    await fetchBetResults();
    if (!account) {
      alert("Please sign in with your NEAR wallet to make a bet.");
      return;
    }

    if (!selectedTeam) {
      alert("Please select a team to bet on.");
      return;
    }

    try {
      if (betResult && betResult.winner === selectedTeam) {
        const transactionAmount = utils.format.parseNearAmount(
          (customBet || selectedOption).toString(),
        );
        await wallet.account().sendMoney(account.accountId, transactionAmount);
        alert(`Congratulations! You won ${transactionAmount / 1e24} NEAR.`);
      } else {
        alert("Sorry, you lost the bet.");
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
    setConfirmationMessage(`You have selected ${team}`);
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
            Entertainment
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
                <h2>
                  {betResult
                    ? betResult["result"]["ARGENTINA"]
                    : data.team1.chanceOfWinning}
                </h2>
                <h4>Chance Of Winning</h4>
                <button onClick={() => handleTeamSelection("ARGENTINA")}>
                  Bet on Argentina
                </button>
              </div>
              <h3>VS</h3>
              <div className="chanWinningTxt">
                <h2>
                  {betResult
                    ? betResult["result"]["SAUDI ARABIA"]
                    : data.team2.chanceOfWinning}
                </h2>
                <h4>Chance Of Winning</h4>
                <button onClick={() => handleTeamSelection("SAUDI ARABIA")}>
                  Bet on Saudi Arabia
                </button>
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
          <button
            className={`radio-button ${selectedOption === "custom" ? "selected" : ""}`}
            onClick={() => handleOptionChange("custom")}
          >
            <input
              placeholder="Custom"
              onChange={(e) => setCustomBet(e.target.value)}
            />
          </button>

          <div id="dashboredBetRight">
            <div>
              <input
                type="number"
                placeholder="Goals by team 1"
                value={team1Goals}
                onChange={(e) => setTeam1Goals(parseInt(e.target.value))}
              />
              <input
                type="number"
                placeholder="Goals by team 2"
                value={team2Goals}
                onChange={(e) => setTeam2Goals(parseInt(e.target.value))}
              />
            </div>
            <button className="radio-button" id="payBtn" onClick={handlePay}>
              Pay
            </button>
          </div>
        </div>
      </div>
      <div>{account ? <button onClick={signOut}>Sign Out</button> : ""}</div>
    </div>
  );
};

export default Dashboard;
