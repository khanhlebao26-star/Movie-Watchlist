import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { watchProgressApi } from "../services/api";

export default function ContinueWatching() {
    const { user } = useAuth();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        const loadContinueWatching = async () => {
            if (!user) {
                setMovies([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const result = await watchProgressApi.getContinueWatching(3);

                if (active) {
                    setMovies(result.movies || []);
                }
            } catch (error) {
                console.error(
                    "Failed to load continue watching:",
                    error
                );

                if (active) {
                    setMovies([]);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadContinueWatching();

        return () => {
            active = false;
        };
    }, [user]);

    if (loading || movies.length === 0) {
        return null;
    }

    return (
        <section className="continue-watching">
            <div className="container">

                <div className="continue-watching-header">
                    <span className="continue-watching-label">
                        FOR YOU
                    </span>

                    <h2 className="continue-watching-title">
                        Continue Watching
                    </h2>
                </div>

                <Link
                        to="/continue-watching"
                        className="continue-watching-view-all"
                    >
                        View All →
                </Link>

                <div className="continue-watching-list">
                    {movies.map((item) => (
                        <article
                            key={item.movie.id}
                            className="continue-watching-card"
                        >
                            <img
                                src={item.movie.posterUrl || "https://placehold.co/150x220?text=Movie"}
                                alt={item.movie.title}
                                className="continue-watching-poster"
                            />

                            <div className="continue-watching-content">

                                <h3 className="continue-watching-movie-title">
                                    {item.movie.title}
                                </h3>

                                <p className="continue-watching-time">
                                    {item.remainingMinutes} min left
                                </p>

                                <div className="continue-watching-progess">
                                    <div 
                                        className="continue-watching-progress-bar"
                                        style={{
                                            width: `${item.progress}%`,
                                        }}
                                    />
                                </div>

                                <Link
                                    to={`/movies/${item.movie.id}/watch`}
                                    className="continue-watching-button"
                                >
                                    <span>▶</span>
                                    Continue Watching
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
    
}
