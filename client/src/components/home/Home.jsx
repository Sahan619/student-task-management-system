import "./home.css";

function Home({ onNavigate }) {

    return (
        <section className="home-page">

            <span className="home-badge">
                ✦ STUDY • ORGANIZE • ACHIEVE
            </span>

            <h1>
                Student Task
                <span> Management System</span>
            </h1>

            <p className="home-description">
                Organize your academic tasks, manage deadlines,
                and stay on top of your studies with ease.
            </p>


            <div className="home-features">

                <div className="home-feature">
                    <div className="feature-icon">
                        ✓
                    </div>

                    <h2>
                        Manage Tasks
                    </h2>

                    <p>
                        Keep all your academic
                        tasks organized.
                    </p>
                </div>


                <div className="home-feature">
                    <div className="feature-icon">
                        ◷
                    </div>

                    <h2>
                        Track Deadlines
                    </h2>

                    <p>
                        Never miss an important
                        deadline.
                    </p>
                </div>


                <div className="home-feature">
                    <div className="feature-icon">
                        ↗
                    </div>

                    <h2>
                        Track Progress
                    </h2>

                    <p>
                        See your progress and
                        stay motivated.
                    </p>
                </div>

            </div>


            <button
                className="home-button"
                onClick={() => onNavigate("login")}
            >
                Get Started →
            </button>

        </section>
    );
}

export default Home;