import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1e293b",
        color: "#ffffff",
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          CodeBridge
        </Link>
      </h2>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ cursor: "pointer" }}>
          <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </NavLink>
        </li>
        
<li style={{ cursor: "pointer" }}>
          <NavLink
            to="/blog"
            style={{color: "white", textDecoration: "none" }}
          >
            Blog
          </NavLink>
        </li>

        <li style={{ cursor: "pointer" }}>
          <NavLink
            to="/programs"
            style={{ color: "white", textDecoration: "none" }}
          >
            Programs
          </NavLink>
        </li>

        <li style={{ cursor: "pointer" }}>
          <NavLink
            to="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login
          </NavLink>
        </li>
        <li style={{ cursor: "pointer" }}>
          <NavLink
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;