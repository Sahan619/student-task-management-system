import "./contact.css";

function Contact() {

    return (

        <section
            className="contact-section"
            id="contact"
        >

            <div className="contact-container">

                <p className="section-label">
                    GET IN TOUCH
                </p>

                <h1>
                    Contact Us
                </h1>

                <p className="contact-intro">
                    Have questions? We're here to help you
                    stay organized and productive.
                </p>


                <div className="contact-cards">

                    <div className="contact-card">

                        <div className="contact-icon">
                            ✉
                        </div>

                        <h2>
                            Email
                        </h2>

                        <p>
                            support@studenttask.com
                        </p>

                    </div>


                    <div className="contact-card">

                        <div className="contact-icon">
                            ?
                        </div>

                        <h2>
                            Support
                        </h2>

                        <p>
                            We're here to help you.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;