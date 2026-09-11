import { useEffect, useState } from "react";
import { trendingApi } from "../services/api";
import PersonCard from "./PersonCard";

export default function TrendingPeople() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const loadPeople = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await trendingApi.getPeople();

                if (active) {
                    setPeople(result.people || []);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.message || "Failed to load trending people."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadPeople();

        return () => {
            active = false;
        };
    }, []);

    return (
        <section className="trending-people">
            <div className="container">
                <div className="trending-people-header">
                    <div>
                        <p className="trending-people-eyebrow">
                            TMDB DISCOVERY
                        </p>

                        <h2 className="home-section-title">
                            Trending People
                        </h2>
                    </div>
                </div>

                {loading && (
                    <div className="loading">
                        Loading trending people...
                    </div>
                )}

                {!loading && error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="people-carousel">
                        {people.map((person) => (
                            <PersonCard
                                key={person.id}
                                person={person}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}