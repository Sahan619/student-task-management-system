import "./about.css";

function About() {

    return (

        <section
            className="about-section"
            id="about"
        >

            <div className="about-container">

                <p className="section-label">
                    ABOUT THE SYSTEM
                </p>

                <h1>
                    Everything Students Need
                    In One Place
                </h1>

                <p className="about-intro">
                    Student Task Management System is designed
                    to help students organize their academic
                    responsibilities, manage tasks, and keep
                    track of their progress from one simple
                    platform.
                </p>


                <div className="about-features">

                    <div className="about-card">

                        <div className="about-icon">
                            🔐
                        </div>

                        <h2>
                            Secure Authentication
                        </h2>

                        <p>
                            Students can register and securely
                            log in to their personal accounts.
                        </p>

                    </div>


                    <div className="about-card">

                        <div className="about-icon">
                            ✓
                        </div>

                        <h2>
                            Task Organization
                        </h2>

                        <p>
                            Create, update, delete and complete
                            academic tasks in an organized way.
                        </p>

                    </div>


                    <div className="about-card">

                        <div className="about-icon">
                            📊
                        </div>

                        <h2>
                            Progress Tracking
                        </h2>

                        <p>
                            Keep track of pending and completed
                            tasks and understand your progress.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;