import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {
    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <span>Student Task Manager</span>
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">

                <a href="#home">Home</a>

                <a href="#about">About Us</a>

                <a href="#services">Services</a>

                <a href="#contact">Contact Us</a>

            </div>

            {/* Login Button */}
            <button
                className="navbar-login"
                onClick={() => {
                    document
                        .getElementById("login")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });
                }}
            >
                Login
            </button>

        </nav>
    );
}

export default Navbar;