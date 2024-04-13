import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Login";
import SignIn from "./Components/Pages/SignIn";
import ExpenseTracker from "./Components/Pages/ExpenseTracker";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<SignIn />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/ExpenseTracker" element={<ExpenseTracker />} />
    </Routes>
  );
}

export default App;
