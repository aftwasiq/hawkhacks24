import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import "./dashboard.css";
import { UserIcon } from "./svg";
import * as nearAPI from "near-api-js";
import axios from "axios";

const { connect, keyStores, WalletConnection } = nearAPI;

// NEAR configuration
const nearConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  appKeyPrefix: "my-app",
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Sports");
  const [betResult, setBetResult] = useState(null);

  useEffect(() => {
    const initNear = async () => {
      try {
        // Create a key store
        const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

        // Connect to NEAR with the given configuration
        const nearConnection = await connect({
          networkId: nearConfig.networkId,
          keyStore: myKeyStore,
          nodeUrl: nearConfig.nodeUrl,
          walletUrl: nearConfig.walletUrl,
          helperUrl: nearConfig.helperUrl,
        });

        // Initialize wallet connection
        const walletConnection = new WalletConnection(
          nearConnection,
          nearConfig.appKeyPrefix,
        );
        setWallet(walletConnection);

        // Check if the user is already signed in
        if (walletConnection.isSignedIn()) {
          const account = walletConnection.account();
          setAccount(account);
          // Store account details in local storage
          localStorage.setItem("nearAccountId", account.accountId);
        } else {
          // If not signed in, try to retrieve account from local storage
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
      console.log("Attempting to sign in with NEAR wallet");
      wallet
        .requestSignIn({
          contractId: "", // No contract ID for login-only purposes
          methodNames: [], // Optional: specify methods the access key should allow
          successUrl: `${window.location.origin}/dashboard`, // Success URL
          failureUrl: `${window.location.origin}/dashboard`, // Failure URL
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
      console.log("Attempting to sign out");
      wallet.signOut();
      setAccount(null);
      localStorage.removeItem("nearAccountId"); // Remove account details from local storage
    } else {
      console.error("Wallet is not initialized");
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleBet = async () => {
    if (!account) {
      alert("Please sign in with your NEAR wallet to make a bet.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/bet", {
        team1: "MOROCCO",
        team2: "FRANCE",
        accountId: account.accountId, // Include the account ID in the bet request
      });
      setBetResult(response.data);
    } catch (error) {
      console.error("Error making bet:", error);
    }
  };

  return (
    <div id="dashboredBackGround">
      <div id="dashboredNavbar">
        <h1>PredicTurf</h1>
        <div id="navbarUserIcon">
          <UserIcon />
        </div>
        {account ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signIn}>Sign In with NEAR</button>
        )}
      </div>
      <div id="dropdownContainer">
        <select
          value={selectedOption}
          onChange={handleDropdownChange}
          className="dropdown"
        >
          <option value="Sports">Sports</option>
          <option value="Geopolitics">Geopolitics</option>
          <option value="Economy">Economy</option>
        </select>
      </div>
      <div id="dashboredBet">
        <button
          className={`radio-button ${selectedOption === 500 ? "selected" : ""}`}
          onClick={() => handleOptionChange(500)}
        >
          $500
        </button>
        <button
          className={`radio-button ${selectedOption === 400 ? "selected" : ""}`}
          onClick={() => handleOptionChange(400)}
        >
          $400
        </button>
        <button
          className={`radio-button ${selectedOption === 7000 ? "selected" : ""}`}
          onClick={() => handleOptionChange(7000)}
        >
          $7000
        </button>
        <button
          className={`radio-button ${selectedOption === 9000 ? "selected" : ""}`}
          onClick={() => handleOptionChange(9000)}
        >
          $9000
        </button>
        <button
          className={`radio-button ${selectedOption === 6600 ? "selected" : ""}`}
          onClick={() => handleOptionChange(6600)}
        >
          $6600
        </button>
        <button
          className={`radio-button ${selectedOption === 200 ? "selected" : ""}`}
          onClick={() => handleOptionChange(200)}
        >
          $200
        </button>

        <div id="dashboredBetRight">
          <button
            className={`radio-button ${selectedOption === "custom" ? "selected" : ""}`}
            onClick={() => handleOptionChange("custom")}
          >
            custom
          </button>
          <button className="radio-button" id="betBtn" onClick={handleBet}>
            Bet
          </button>
        </div>
      </div>
      {betResult && (
        <div id="betResult">
          <p>
            {betResult.team1}: {betResult.prob_team1}
          </p>
          <p>
            {betResult.team2}: {betResult.prob_team2}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
