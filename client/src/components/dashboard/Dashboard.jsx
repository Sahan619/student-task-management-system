import "./dashboard.css";

function Dashboard({
    onNavigate,
    onLogout
}) {

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    return (
        <section className="dashboard-page">

            <div className="dashboard-header">

                <div>
                    <span className="section-label">
                        STUDENT DASHBOARD
                    </span>

                    <h1>
                        Welcome, {user.name || "Student"}
                    </h1>

                    <p>
                        Manage your academic tasks
                        and stay organized.
                    </p>
                </div>

                <button
                    className="dashboard-logout"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>


            <div className="dashboard-grid">

                <div
                    className="dashboard-card"
                    onClick={() => onNavigate("tasks")}
                >

                    <div className="dashboard-icon">
                        ✓
                    </div>

                    <h2>
                        My Tasks
                    </h2>

                    <p>
                        Create and manage your
                        academic tasks.
                    </p>

                    <button>
                        Manage Tasks →
                    </button>

                </div>


                <div className="dashboard-card">

                    <div className="dashboard-icon">
                        ◷
                    </div>

                    <h2>
                        Deadlines
                    </h2>

                    <p>
                        Keep track of important
                        upcoming deadlines.
                    </p>

                    <button
                        onClick={() =>
                            onNavigate("tasks")
                        }
                    >
                        View Tasks →
                    </button>

                </div>


                <div className="dashboard-card">

                    <div className="dashboard-icon">
                        ↗
                    </div>

                    <h2>
                        Progress
                    </h2>

                    <p>
                        Monitor your academic
                        task progress.
                    </p>

                    <button
                        onClick={() =>
                            onNavigate("tasks")
                        }
                    >
                        View Progress →
                    </button>

                </div>

            </div>

        </section>
    );
}

export default Dashboard;