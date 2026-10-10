import "./services.css";

function Services({ onNavigate }) {

    return (
        <section className="services-page">

            <span className="section-label">
                SYSTEM FEATURES
            </span>

            <h1>
                Simple Tools For Students
            </h1>

            <p className="services-description">
                Everything you need to organize
                your academic responsibilities.
            </p>


            <div className="services-grid">

                <div className="service-card">

                    <div className="service-icon">
                        🔐
                    </div>

                    <h2>
                        Authentication
                    </h2>

                    <p>
                        Secure registration and login
                        for student accounts.
                    </p>

                    <button
                        onClick={() =>
                            onNavigate("login")
                        }
                    >
                        Login →
                    </button>

                </div>


                <div className="service-card">

                    <div className="service-icon">
                        ✓
                    </div>

                    <h2>
                        Task Management
                    </h2>

                    <p>
                        Create, update, complete and
                        delete your academic tasks.
                    </p>

                    <button
                        onClick={() =>
                            onNavigate("tasks")
                        }
                    >
                        Manage Tasks →
                    </button>

                </div>


                <div className="service-card">

                    <div className="service-icon">
                        📊
                    </div>

                    <h2>
                        Progress Tracking
                    </h2>

                    <p>
                        Monitor your pending and
                        completed academic work.
                    </p>

                    <button
                        onClick={() =>
                            onNavigate("tasks")
                        }
                    >
                        View Tasks →
                    </button>

                </div>

            </div>

        </section>
    );
}

export default Services;