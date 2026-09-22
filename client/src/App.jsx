import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url;
            let body;

            if (isLogin) {
                url = "http://localhost:5000/api/auth/login";
                body = {
                    email,
                    password,
                };
            } else {
                url = "http://localhost:5000/api/auth/register";
                body = {
                    name,
                    email,
                    password,
                };
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="app">

            {/* ================= NAVBAR ================= */}
            <Navbar />


            {/* ================= HOME SECTION ================= */}
            <section id="home" className="home-section">

                <div className="home-content">

                    <h1>
                        Student Task
                        <span> Management System</span>
                    </h1>

                    <p>
                        Organize your tasks, manage your time,
                        and improve your productivity.
                    </p>

                </div>

            </section>


            {/* ================= ABOUT SECTION ================= */}
            <section id="about" className="about-section">

                <h2>About Us</h2>

                <p>
                    Student Task Management System helps students
                    organize, manage and track their academic tasks
                    efficiently.
                </p>

            </section>


            {/* ================= SERVICES SECTION ================= */}
            <section id="services" className="services-section">

                <h2>Services</h2>

                <div className="services-container">

                    <div className="service-card">
                        <h3>Task Management</h3>
                        <p>
                            Create, update and manage your
                            academic tasks easily.
                        </p>
                    </div>

                    <div className="service-card">
                        <h3>Task Tracking</h3>
                        <p>
                            Track your progress and stay
                            organized.
                        </p>
                    </div>

                    <div className="service-card">
                        <h3>Secure Login</h3>
                        <p>
                            Keep your account protected with
                            secure authentication.
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= LOGIN / REGISTER ================= */}
            <section id="login" className="auth-section">

                <div className="auth-container">

                    <h2>
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>

                    <p className="auth-subtitle">
                        {isLogin
                            ? "Login to manage your tasks"
                            : "Register to start managing your tasks"}
                    </p>


                    <form onSubmit={handleSubmit}>

                        {/* NAME - REGISTER ONLY */}
                        {!isLogin && (
                            <div className="input-group">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />

                            </div>
                        )}


                        {/* EMAIL */}
                        <div className="input-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* PASSWORD */}
                        <div className="input-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="auth-button"
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>

                    </form>


                    {/* SWITCH LOGIN / REGISTER */}
                    <button
                        className="switch-button"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </button>

                </div>

            </section>


            {/* ================= CONTACT SECTION ================= */}
            <section id="contact" className="contact-section">

                <h2>Contact Us</h2>

                <p>
                    Have a question? Feel free to contact us.
                </p>

                <p>
                    Email: support@studenttasksystem.com
                </p>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="footer">

                <p>
                    © 2026 Student Task Management System.
                    All Rights Reserved.
                </p>

            </footer>

        </div>
    );
}

export default App;