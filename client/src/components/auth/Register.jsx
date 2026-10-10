import { useState } from "react";
import "./auth.css";

function Register({ onRegisterSuccess, onLoginClick }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Registration failed."
                );
                return;
            }

            setSuccess(
                "Registration successful! You can now login."
            );

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {

            console.error(error);

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <section className="auth-section">

            <div className="auth-card">

                <div className="auth-header">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Start managing your tasks today
                    </p>

                </div>


                {error && (
                    <div className="error-message">
                        <span>!</span>
                        {error}
                    </div>
                )}


                {success && (
                    <div className="success-message">
                        ✓ {success}
                    </div>
                )}


                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    <button
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"
                        }
                    </button>

                </form>


                <div className="auth-switch">

                    Already have an account?

                    <button
                        type="button"
                        onClick={onLoginClick}
                    >
                        Login
                    </button>

                </div>

            </div>

        </section>
    );
}

export default Register;