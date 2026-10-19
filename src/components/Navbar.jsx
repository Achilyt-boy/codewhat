import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/programs", label: "Programs" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          CodeBridge
        </Link>
      </h2>

      {/* Desktop navigation */}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          padding: 0,
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <li key={link.to} style={{ cursor: "pointer" }}>
            <NavLink
              to={link.to}
              style={{ color: "white", textDecoration: "none" }}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
          padding: "5px",
        }}
        className="mobile-hamburger"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            listStyle: "none",
            margin: "10px 0 0 0",
            padding: "0",
            gap: "10px",
            backgroundColor: "#1e293b",
            paddingRight: "20px",
          }}
          className="mobile-nav"
        >
          {navLinks.map((link) => (
            <li
              key={link.to}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            >
              <NavLink
                to={link.to}
                style={{ color: "white", textDecoration: "none", display: "block", padding: "8px 0" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;