import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { movieApi } from "../services/api";

export default function Home({
    search,
    genre,
    page,
    setPage,
}) {
    const [movies, setMovies] = useState([]);

    const [pagination, setPagination] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* =========================================
       FETCH MOVIES
    ========================================= */
    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError("");

                const result = await movieApi.getMovies({
                    page,
                    limit: 10,
                    search: search || undefined,
                    genre: genre || undefined,
                });

                setMovies(result.movies || []);
                setPagination(result.pagination || null);
            } catch (err) {
                setError(err.message || "Failed to load movies.");
                setMovies([]);
                setPagination(null);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [search, genre, page]);

    return (
        <main className="home-page">
            {/* HERO */}
            <section className="home-hero">
                <div className="container">
                    <div className="home-hero-content">
                        <span className="home-hero-label">
                            YOUR PERSONAL MOVIE SPACE
                        </span>

                        <h1 className="home-hero-title">
                            Find your next <span> favorite movie.</span>
                        </h1>

                        <p className="home-hero-description">
                            Discover movies, explore new stories, and keep track
                            of everything you want to watch.
                        </p>
                    </div>
                </div>
            </section>

            {/* MOVIE SECTION */}
            <section className="home-movies">
                <div className="container">
                    <div className="home-section-header">
                        <div className="page-header-content">
                            <h2 className="home-section-title">
                                Discover Movies
                            </h2>
                            <p className="home-section-description">
                                Explore movies and find something worth watching.
                            </p>
                        </div>
                    </div>

                    {/* MOVIE RESULT */}
                    {loading && (
                        <div className="loading">Loading movies...</div>
                    )}

                    {!loading && error && (
                        <div className="error-message">{error}</div>
                    )}

                    {!loading && !error && (
                        <>
                            <MovieList movies={movies} />

                            {pagination && pagination.pages > 1 && (
                                <div className="pagination">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        disabled={page <= 1 || loading}
                                        onClick={() =>
                                            setPage(
                                                (currentPage) => currentPage - 1
                                            )
                                        }
                                    >
                                        Previous
                                    </button>

                                    <span>
                                        Page {pagination.page} of{" "}
                                        {pagination.pages}
                                    </span>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        disabled={
                                            page >= pagination.pages || loading
                                        }
                                        onClick={() =>
                                            setPage(
                                                (currentPage) => currentPage + 1
                                            )
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}