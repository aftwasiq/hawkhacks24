import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    team1: {
      name: "",
      totalBet: 0,
      yourBet: 0,
      data: [],
      leaderBoard: [
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
      ],
      chanceOfWinning: 0,
    },
    team2: {
      name: "",
      totalBet: 0,
      yourBet: 0,
      data: [],
      leaderBoard: [
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
        { name: "", bet: 0 },
      ],
      chanceOfWinning: 0,
    },
  });
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login data={data} setData={setData} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard data={data} />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
