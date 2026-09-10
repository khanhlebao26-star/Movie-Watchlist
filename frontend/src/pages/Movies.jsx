import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { movieApi } from "../services/api";

export default function Movies({
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
        const fetchMovies = async () => {
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
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load movies."
                );

                setMovies([]);
                setPagination(null);

            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [search, genre, page]);

    return (
        <main className="page movies-page">

            <div className="container">

                {/* HEADER */}
                <div className="home-section-header">

                    <div className="page-header-content">

                        <h1 className="home-section-title">
                            All Movies
                        </h1>

                        <p className="home-section-description">
                            Browse all movies in the collection.
                        </p>

                    </div>

                </div>


                {/* LOADING */}
                {loading && (
                    <div className="loading">
                        Loading movies...
                    </div>
                )}


                {/* ERROR */}
                {!loading && error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {/* MOVIES */}
                {!loading && !error && (
                    <>
                        <MovieList movies={movies} />


                        {/* PAGINATION */}
                        {pagination && pagination.pages > 1 && (
                            <div className="pagination">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    disabled={page <= 1}
                                    onClick={() =>
                                        setPage(
                                            (currentPage) =>
                                                currentPage - 1
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
                                        page >= pagination.pages
                                    }
                                    onClick={() =>
                                        setPage(
                                            (currentPage) =>
                                                currentPage + 1
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

        </main>
    );
}