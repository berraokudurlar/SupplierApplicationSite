import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";  
import "./styles/primefaces.css";  
import "./styles/buttons.css";  
import "./styles/websiteheader.css"; 
import "./styles/mainscreen.css";   
import "./styles/register.css";  
import "./styles/emailverification.css";  
import "./styles/forgotpassword.css";  
  
import './i18n.js';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
