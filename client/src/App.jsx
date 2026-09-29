import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";


function App() {

    // Login / Register switch
    const [isLogin, setIsLogin] = useState(true);

    // Form values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Message from backend
    const [message, setMessage] = useState("");

    // Message type: success or error
    const [messageType, setMessageType] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);


    // ==========================================
    // LOGIN
    // ==========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        // Clear old message
        setMessage("");
        setMessageType("");

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
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Backend response:", data);

            if (response.ok) {

                // Backend confirmed login
                setMessage(
                    data.message || "Login successful!"
                );

                setMessageType("success");

                // Clear password
                setPassword("");

            } else {

                // Backend rejected login
                setMessage(
                    data.message || "Invalid email or password."
                );

                setMessageType("error");
            }

        } catch (error) {

            console.error("Login error:", error);

            setMessage(
                "Unable to connect to the server."
            );

            setMessageType("error");

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // REGISTER
    // ==========================================

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");

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
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Backend response:", data);

            if (response.ok) {

                setMessage(
                    data.message || "Registration successful!"
                );

                setMessageType("success");

                // Clear form
                setName("");
                setEmail("");
                setPassword("");

            } else {

                setMessage(
                    data.message || "Registration failed."
                );

                setMessageType("error");
            }

        } catch (error) {

            console.error("Register error:", error);

            setMessage(
                "Unable to connect to the server."
            );

            setMessageType("error");

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // SWITCH LOGIN / REGISTER
    // ==========================================

    const switchMode = () => {

        setIsLogin(!isLogin);

        // Clear form
        setName("");
        setEmail("");
        setPassword("");

        // Clear message
        setMessage("");
        setMessageType("");
    };


    return (
        <div className="app">

            {/* =================================
                NAVIGATION BAR
            ================================= */}

            <Navbar />


            {/* =================================
                HOME
            ================================= */}

 <section id="home" className="home-section">

    <div className="home-content">

        <div className="hero-badge">
            ✦ STUDY • ORGANIZE • ACHIEVE
        </div>

        <h1>
            Student Task
            <span> Management System</span>
        </h1>

        <p className="hero-description">
            Organize your academic tasks, manage deadlines,
            and stay on top of your studies with ease.
        </p>

        <div className="hero-cards">

            <div className="hero-card">
                <div className="card-icon">✓</div>
                <h3>Manage Tasks</h3>
                <p>Keep all your academic tasks organized.</p>
            </div>

            <div className="hero-card">
                <div className="card-icon">◷</div>
                <h3>Track Deadlines</h3>
                <p>Never miss an important deadline.</p>
            </div>

            <div className="hero-card">
                <div className="card-icon">↗</div>
                <h3>Track Progress</h3>
                <p>See your progress and stay motivated.</p>
            </div>

        </div>

        <button
            className="hero-button"
            onClick={() => {
                document
                    .getElementById("login")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            }}
        >
            Get Started →
        </button>

    </div>
    </section>

<section className="about-section" id="about">

    <div className="about-header">
        <p className="about-label">ABOUT THE SYSTEM</p>

        <h2>Everything Students Need In One Place</h2>

        <p className="about-description">
            Student Task Management System is designed to help students
            organize their academic responsibilities, manage tasks, and
            keep track of their progress from one simple platform.
        </p>
    </div>


    <div className="about-features">

        {/* Feature 1 */}
        <div className="about-card">

            <div className="about-icon">
                🔐
            </div>

            <h3>Secure Authentication</h3>

            <p>
                Students can register and securely log in to their
                personal accounts.
            </p>

        </div>


        {/* Feature 2 */}
        <div className="about-card">

            <div className="about-icon">
                ✓
            </div>

            <h3>Task Organization</h3>

            <p>
                Create, update, delete, and complete academic tasks
                in an organized way.
            </p>

        </div>


        {/* Feature 3 */}
        <div className="about-card">

            <div className="about-icon">
                📊
            </div>

            <h3>Progress Tracking</h3>

            <p>
                Keep track of pending and completed tasks and understand
                your academic progress.
            </p>

        </div>

    </div>

</section>

<section id="services" className="services-section">

    <div className="section-header">
        <h1>
        <span className="section-label">
            SYSTEM FEATURES
        </span>
        </h1>
        <h2>
            What You Can Do
        </h2>

        <p>
            Simple tools designed around the needs of students.
        </p>

    </div>


    <div className="services-container">

        {/* Authentication */}

        <div className="service-card">

            <div className="service-icon">
                🔐
            </div>

            <h3>Authentication</h3>

            <p>
                Create an account and securely log in to access
                your personal student workspace.
            </p>

            

        </div>


        {/* User Management */}

        <div className="service-card">

            <div className="service-icon">
                👤
            </div>

            <h3>User Management</h3>

            <p>
                Manage your account and access your own
                personalized tasks and information.
            </p>

            

        </div>


        {/* Task Management */}

        <div className="service-card">

            <div className="service-icon">
                📝
            </div>

            <h3>Task Management</h3>

            <p>
                Create, view, update, delete, and complete
                your academic tasks.
            </p>

          

        </div>


        {/* Task Tracking */}

        <div className="service-card">

            <div className="service-icon">
                📊
            </div>

            <h3>Task Tracking</h3>

            <p>
                Easily identify your pending and completed
                academic tasks.
            </p>

            

        </div>


        {/* Database */}

        <div className="service-card">

            <div className="service-icon">
                🗄️
            </div>

            <h3>Personal Data</h3>

            <p>
                Your user and task information is stored and
                managed through the application database.
            </p>

            

        </div>


        {/* Security */}

        <div className="service-card">

            <div className="service-icon">
                🛡️
            </div>

            <h3>Protected Access</h3>

            <p>
                Protected routes and authentication will ensure
                that users can access their own information.
            </p>

            

        </div>

    </div>

</section>

            


            {/* =================================
                LOGIN / REGISTER
            ================================= */}

            <section
                id="login"
                className="auth-section"
            >

                <div className="auth-container">

                    {/* Title */}

                    <h2>
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>


                    {/* Subtitle */}

                    <p className="auth-subtitle">

                        {isLogin
                            ? "Login to manage your tasks"
                            : "Create your student account"
                        }

                    </p>


                    {/* =================================
                        BACKEND MESSAGE
                    ================================= */}

                    {message && (

                        <div
                            className={`login-message ${messageType}`}
                        >

                            <span className="message-icon">

                                {messageType === "success"
                                    ? "✓"
                                    : "!"
                                }

                            </span>

                            {message}

                        </div>

                    )}


                    {/* =================================
                        FORM
                    ================================= */}

                    <form
                        onSubmit={
                            isLogin
                                ? handleLogin
                                : handleRegister
                        }
                    >


                        {/* NAME - REGISTER ONLY */}

                        {!isLogin && (

                            <div className="input-group">

                                <label htmlFor="name">
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Enter your name"
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
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
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
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                required
                            />

                        </div>


                        {/* SUBMIT BUTTON */}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Please wait..."
                                : isLogin
                                    ? "Login"
                                    : "Create Account"
                            }

                        </button>

                    </form>


                    {/* =================================
                        SWITCH BUTTON
                    ================================= */}

                    <button
                        type="button"
                        className="switch-button"
                        onClick={switchMode}
                    >

                        {isLogin
                            ? "Don't have an account? Create one"
                            : "Already have an account? Login"
                        }

                    </button>

                </div>

            </section>


            {/* =================================
                CONTACT
            ================================= */}
  <section id="contact" className="contact-section">

    <h2>Contact Us</h2>

    <p>
        Have questions? We're here to help you stay organized and productive.
    </p>

    <div className="contact-container">

        <div className="contact-card">
            <h3>Email</h3>
            <p>support@studenttask.com</p>
        </div>

        <div className="contact-card">
            <h3>Support</h3>
            <p>We're here to help you.</p>
        </div>

    </div>

</section>

            {/* =================================
                FOOTER
            ================================= */}

            <footer className="footer">

                <p>
                    © 2026 Student Task Management System
                </p>

            </footer>

        </div>
    );
}

export default App;