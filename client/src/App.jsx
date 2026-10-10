import { useState } from "react";

import Navbar from "./components/navbar/navbar";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Services from "./components/services/Services";
import TaskManagement from "./components/tasks/TaskManagement";

import "./App.css";

function App() {
    const [page, setPage] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setPage("dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setPage("home");
    };

    const navigate = (targetPage) => {
        setPage(targetPage);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="app">

            <Navbar
                isLoggedIn={isLoggedIn}
                onNavigate={navigate}
                onLogout={handleLogout}
            />

            <main>

                {page === "home" && (
                    <Home
                        onNavigate={navigate}
                    />
                )}

                {page === "dashboard" && isLoggedIn && (
                    <Dashboard
                        onNavigate={navigate}
                        onLogout={handleLogout}
                    />
                )}

                {page === "services" && (
                    <Services
                        onNavigate={navigate}
                    />
                )}

                {page === "tasks" && isLoggedIn && (
                    <TaskManagement />
                )}

                {page === "login" && (
                    <LoginPage
                        onLoginSuccess={handleLoginSuccess}
                        onNavigate={navigate}
                    />
                )}
                {page === "register" && (
                     <RegisterPage />
   )} 

                {page === "contact" && (
                    <ContactPage />
                )}

                {page === "about" && (
                    <AboutPage />
                )}

            </main>

        </div>
    );
}


/* ============================= */
/* LOGIN PAGE */
/* ============================= */

function LoginPage({ onLoginSuccess, onNavigate }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            onLoginSuccess();

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to connect to the server"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <section className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    ✓
                </div>

                <h1>Welcome Back</h1>

                <p>
                    Login to manage your tasks
                </p>

                {error && (
                    <div className="error-message">
                        ! {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        className="primary-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="auth-link">
                    Don't have an account?
                    <button
                        onClick={() =>
                            onNavigate("register")
                        }
                    >
                        Create one
                    </button>
                </p>

            </div>

        </section>
    );
}


/* ============================= */
/* ABOUT PAGE */
/* ============================= */

function AboutPage() {

    return (
        <section className="simple-page">

            <span className="section-label">
                ABOUT THE SYSTEM
            </span>

            <h1>
                Everything Students Need In One Place
            </h1>

            <p>
                Student Task Management System is designed
                to help students organize their academic
                responsibilities, manage tasks, and keep
                track of their progress from one simple
                platform.
            </p>

            <div className="info-grid">

                <div className="info-card">
                    <div className="info-icon">🔐</div>

                    <h2>
                        Secure Authentication
                    </h2>

                    <p>
                        Students can register and securely
                        log in to their personal accounts.
                    </p>
                </div>

                <div className="info-card">
                    <div className="info-icon">✓</div>

                    <h2>
                        Task Organization
                    </h2>

                    <p>
                        Create, update, delete, and complete
                        academic tasks in an organized way.
                    </p>
                </div>

                <div className="info-card">
                    <div className="info-icon">📊</div>

                    <h2>
                        Progress Tracking
                    </h2>

                    <p>
                        Keep track of pending and completed
                        tasks and understand your academic
                        progress.
                    </p>
                </div>

            </div>

        </section>
    );
}


/* ============================= */
/* CONTACT PAGE */
/* ============================= */

function ContactPage() {

    return (
        <section className="simple-page contact-page">

            <span className="section-label">
                CONTACT US
            </span>

            <h1>
                We're Here To Help
            </h1>

            <p>
                Have questions? Contact our team.
            </p>

            <div className="contact-grid">

                <div className="contact-card">
                    <h2>Email</h2>

                    <p>
                        support@studenttask.com
                    </p>
                </div>

                <div className="contact-card">
                    <h2>Support</h2>

                    <p>
                        We're here to help you.
                    </p>
                </div>

            </div>

        </section>
    );
}


/* ============================= */
/* REGISTER PAGE */
/* ============================= */

function RegisterPage() {

    return (
        <section className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    +
                </div>

                <h1>
                    Create Account
                </h1>

                <p>
                    Create your student account
                </p>

                <form>

                    <label>Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                    />

                    <button
                        type="button"
                        className="primary-button"
                    >
                        Create Account
                    </button>

                </form>

            </div>

        </section>
    );
}

export default App;