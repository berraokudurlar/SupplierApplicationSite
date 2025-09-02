import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen.jsx";
import Register from "./pages/Register.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
