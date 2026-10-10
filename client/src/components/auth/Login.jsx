import React, { useState } from "react";
import "./auth.css";

function Login({ onLoginSuccess, onRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter email and password.");
            return;
        }

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
                setMessage(data.message || "Login failed");
                setLoading(false);
                return;
            }

            // IMPORTANT:
            // Save JWT token before opening dashboard
            localStorage.setItem("token", data.token);

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setMessage("Login successful!");

            // Send user back to App.jsx
            if (typeof onLoginSuccess === "function") {
                onLoginSuccess(data.user);
            }

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            setMessage(
                "Unable to connect to the server."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Login to manage your tasks
                </p>

                {message && (
                    <div
                        className={
                            message === "Login successful!"
                                ? "success-message"
                                : "error-message"
                        }
                    >
                        {message}
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
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="register-text">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="register-link"
                        onClick={onRegister}
                    >
                        Create one
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Login;