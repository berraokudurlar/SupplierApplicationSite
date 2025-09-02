import React, { useEffect, useState } from "react";

export default function Welcome() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/notwelcome")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage("Failed to fetch backend"));
  }, []);

  return (
    <div>
      <h1>Backend says:</h1>
      <p>{message}</p>
    </div>
  );
}


