import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Project Doctorly</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;
