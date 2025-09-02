import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function GoHome() {
  return (
    <Link to="/">
      <Button
        icon="pi pi-home"
        className="go-home-btn p-button-rounded p-button-lg"
        style={{
          position: "fixed",
          zIndex: 1000,
        }}
      />
    </Link>
  );
}
