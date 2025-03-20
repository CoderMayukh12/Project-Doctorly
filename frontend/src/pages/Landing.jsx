import React from "react";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="landing-container">
        <h2>Welcome to Project Doctorly</h2>
        <p>Your personal blood report analysis tool.</p>
      </div>
    </div>
  );
};

export default Landing;
