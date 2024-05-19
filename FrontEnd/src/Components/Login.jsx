import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import "./LogInPage.css";
import * as nearAPI from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;

const nearConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  appKeyPrefix: "my-app",
};

const Login = ({ data, setData }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);

  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [betResult, setBetResult] = useState(null);

  const { username, password } = formData;

  useEffect(() => {
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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const signIn = () => {
    if (wallet) {
      console.log("Attempting to sign in with NEAR wallet");
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

  useEffect(() => {
    const sendDummyData = async () => {
      try {
        const response = await axios.post("/api/dummy", { data: "example" });
        console.log("Dummy data response 1:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error sending dummy data:", error);
      }
    };

    sendDummyData();
  }, []);

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h2>PredicTurf</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <button onClick={signIn}>Sign In with NEAR</button>
        <div id="registerLink">
          <a href="/register">Don't have an account?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
