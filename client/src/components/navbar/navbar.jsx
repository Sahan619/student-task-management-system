import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {

    const handleLogin = () => {
        const loginSection = document.getElementById("login");

        if (loginSection) {
            loginSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (
        <nav className="stm-navbar">

            {/* Brand */}
            <div className="stm-brand">

                <div className="stm-logo-wrapper">
                    <img
                        src={logo}
                        alt="Student Task Manager"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling.style.display = "flex";
                        }}
                    />

                    {/* Fallback if logo doesn't load */}
                    <div className="stm-logo-fallback">
                        STM
                    </div>
                </div>

                <span className="stm-brand-name">
                    Student Task Manager
                </span>

            </div>


            {/* Navigation */}
            <div className="stm-nav-links">

                <a href="#home" className="active">
                    Home
                </a>

                <a href="#about">
                    About Us
                </a>

                <a href="#services">
                    Services
                </a>

                <a href="#contact">
                    Contact Us
                </a>

            </div>


            {/* Login */}
            <button
                type="button"
                className="stm-login-btn"
                onClick={handleLogin}
            >
                Login
            </button>

        </nav>
    );
}

export default Navbar;