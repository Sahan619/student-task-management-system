import "./navbar.css";

function Navbar({
    isLoggedIn,
    onNavigate,
    onLogout
}) {

    return (
        <nav className="navbar">

            <div
                className="navbar-brand"
                onClick={() => onNavigate("home")}
            >
                <div className="brand-short">
                    STM
                </div>

                <div>
                    <h2>
                        Student Task Manager
                    </h2>

                    <span>
                        Keep on track and explore your path
                    </span>
                </div>
            </div>


            <div className="navbar-links">

                <button
                    onClick={() => onNavigate("home")}
                >
                    Home
                </button>

                <button
                    onClick={() => onNavigate("about")}
                >
                    About Us
                </button>

                <button
                    onClick={() => onNavigate("services")}
                >
                    Services
                </button>

                <button
                    onClick={() => onNavigate("contact")}
                >
                    Contact Us
                </button>


                {!isLoggedIn ? (

                    <button
                        className="nav-login"
                        onClick={() => onNavigate("login")}
                    >
                        Login
                    </button>

                ) : (

                    <>
                        <button
                            className="nav-dashboard"
                            onClick={() =>
                                onNavigate("dashboard")
                            }
                        >
                            Dashboard
                        </button>

                        <button
                            className="nav-task"
                            onClick={() =>
                                onNavigate("tasks")
                            }
                        >
                            My Tasks
                        </button>

                        <button
                            className="nav-logout"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </>

                )}

            </div>

        </nav>
    );
}

export default Navbar;