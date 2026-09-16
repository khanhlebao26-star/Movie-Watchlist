import { useState } from "react";
import "../styles/newsletter.css";

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Chưa xử lý chức năng ở giai đoạn này
        console.log("Newsletter email:", email);
    };

    return (
        <section className="newsletter">
            <div className="container">
                <div className="newsletter-content">

                    <span className="newsletter-label">
                        DON'T MISS OUT
                    </span>

                    <h2 className="newsletter-title">
                        Get weekly movie{" "}
                        <span>recommendations</span>
                    </h2>

                    <p className="newsletter-description">
                        A short email with the best movies of the week,
                        handpicked for movie lovers.
                    </p>

                    <form
                        className="newsletter-form"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                        <button type="submit">
                            Subscribe
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
}