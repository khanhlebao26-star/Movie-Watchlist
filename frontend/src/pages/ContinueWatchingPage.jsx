import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";
import { watchProgressApi } from "../services/api";

export default function ContinueWatchingPage() {
    const { user } = useAuth();
    const { showToast } = useToast();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completingId, setCompletingId] = useState(null);

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

                // Lấy toàn bộ phim đang xem dở
                const result =
                    await watchProgressApi.getContinueWatching(50);

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

    const handleMarkAsWatched = async (movieId) => {
        try {
            setCompletingId(movieId);

            await watchProgressApi.markCompleted(movieId);

            // Xóa khỏi danh sách trên UI
            setMovies((prev) =>
                prev.filter(
                    (item) => item.movie.id !== movieId
                )
            );

            showToast(
                "Movie marked as watched.",
                "success"
            );
        } catch (error) {
            console.error(
                "Failed to mark movie as watched:",
                error
            );

            showToast(
                error.message || "Failed to update movie.",
                "error"
            );
        } finally {
            setCompletingId(null);
        }
    };

    if (loading) {
        return (
            <main className="continue-watching-page">
                <div className="container">
                    <div className="loading">
                        Loading...
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="continue-watching-page">
            <div className="container">

                {/* Header */}
                <header className="continue-watching-page-header">
                    <span className="continue-watching-label">
                        FOR YOU
                    </span>

                    <h1 className="continue-watching-page-title">
                        Continue Watching
                    </h1>

                    <p className="continue-watching-page-description">
                        Continue watching your unfinished movies.
                    </p>
                </header>

                {/* Empty state */}
                {movies.length === 0 ? (
                    <div className="continue-watching-empty">
                        <h2>
                            No movies to continue
                        </h2>

                        <p>
                            You don't have any unfinished movies yet.
                        </p>

                        <Link
                            to="/movies"
                            className="continue-watching-empty-button"
                        >
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    /* Movie list */
                    <div className="continue-watching-page-list">
                        {movies.map((item) => {
                            const movie = item.movie;

                            return (
                                <article
                                    key={movie.id}
                                    className="continue-watching-page-card"
                                >
                                    {/* Poster */}
                                    <img
                                        src={
                                            movie.posterUrl ||
                                            "https://placehold.co/180x270?text=Movie"
                                        }
                                        alt={movie.title}
                                        className="continue-watching-page-poster"
                                    />

                                    {/* Content */}
                                    <div className="continue-watching-page-content">

                                        <h2 className="continue-watching-page-movie-title">
                                            {movie.title}
                                        </h2>

                                        <p className="continue-watching-page-time">
                                            {item.remainingMinutes} min left
                                        </p>

                                        {/* Progress */}
                                        <div className="continue-watching-page-progress">
                                            <div
                                                className="continue-watching-page-progress-bar"
                                                style={{
                                                    width: `${item.progress}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="continue-watching-page-progress-text">
                                            {item.progress}% watched
                                        </p>

                                        {/* Actions */}
                                        <div className="continue-watching-page-actions">

                                            <Link
                                                to={`/movies/${movie.id}/watch`}
                                                className="continue-watching-page-continue"
                                            >
                                                <span>▶</span>
                                                Continue Watching
                                            </Link>

                                            <button
                                                type="button"
                                                className="continue-watching-page-complete"
                                                onClick={() =>
                                                    handleMarkAsWatched(
                                                        movie.id
                                                    )
                                                }
                                                disabled={
                                                    completingId === movie.id
                                                }
                                            >
                                                {completingId === movie.id
                                                    ? "Updating..."
                                                    : "✓ Mark as Watched"}
                                            </button>

                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}