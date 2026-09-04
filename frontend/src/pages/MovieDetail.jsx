import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";
import { movieApi, watchlistApi } from "../services/api";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [addingToWatchlist, setAddingToWatchlist] = useState(false);
    // const [watchlistMessage, setWatchlistMessage] = useState("");
    const { showToast } = useToast();

    const [deleting, setDeleting] = useState(false);

    /* FETCH MOVIE */
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await movieApi.getMovieById(id);

                setMovie(result.movie);
            } catch (err) {
                setError(
                    err.message || "Failed to load movie."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    /* ADD TO WATCHLIST */
    const handleAddToWatchlist = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            setAddingToWatchlist(true);
            await watchlistApi.addToWatchlist({
                movieId: movie.id,
            });

            showToast("Movie added to your watchlist.", "success");
        } catch (err) {
            showToast(
            err.message || "Failed to add movie.",
            "error"
        );
        } finally {
            setAddingToWatchlist(false);
        }
    };

    /* DELETE MOVIE */
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this movie?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);

            await movieApi.deleteMovie(movie.id);

            navigate("/movies");
        } catch (err) {
            setError(
                err.message || "Failed to delete movie."
            );
            setDeleting(false);
        }
    };

    /* LOADING */
    if (loading) {
        return (
            <main className="page">
                <div className="container">
                    <div className="loading">
                        <span className="spinner"></span>
                        <span>Loading movie...</span>
                    </div>
                </div>
            </main>
        );
    }

    /* ERROR */
    if (error || !movie) {
        return (
            <main className="page">
                <div className="container">
                    <div className="error-message">
                        {error || "Movie not found."}
                    </div>

                    <Link
                        to="/movies"
                        className="btn btn-secondary movie-detail-back"
                    >
                        ← Back to Movies
                    </Link>
                </div>
            </main>
        );
    }

    const isOwner =
        user && movie.createdBy === user.id;

    return (
        <main className="movie-detail-page">
            <div className="container">

                {/* BACK BUTTON */}
                <Link
                    to="/movies"
                    className="movie-detail-back"
                >
                    ← Back to Movies
                </Link>

                {/* MAIN DETAIL */}
                <section className="movie-detail">

                    {/* POSTER */}
                    <div className="movie-detail-poster-wrapper">
                        <img
                            src={
                                movie.posterUrl ||
                                "https://placehold.co/500x750?text=Movie"
                            }
                            alt={movie.title}
                            className="movie-detail-poster"
                        />
                    </div>

                    {/* INFORMATION */}
                    <div className="movie-detail-content">

                        <div className="movie-detail-header">

                            <span className="movie-detail-label">
                                MOVIE DETAILS
                            </span>

                            <h1 className="movie-detail-title">
                                {movie.title}
                            </h1>

                            <div className="movie-detail-meta">

                                <span>
                                    {movie.releaseYear}
                                </span>

                                {movie.runtime && (
                                    <>
                                        <span className="movie-detail-dot">
                                            •
                                        </span>

                                        <span>
                                            {movie.runtime} min
                                        </span>
                                    </>
                                )}

                            </div>

                        </div>

                        {/* GENRES */}
                        {movie.genres?.length > 0 && (
                            <div className="movie-detail-genres">

                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="movie-detail-genre"
                                    >
                                        {genre}
                                    </span>
                                ))}

                            </div>
                        )}

                        {/* OVERVIEW */}
                        <div className="movie-detail-section">

                            <h2 className="movie-detail-section-title">
                                Overview
                            </h2>

                            <p className="movie-detail-overview">
                                {movie.overview ||
                                    "No overview available for this movie."}
                            </p>

                        </div>

                        {/* WATCHLIST */}
                        <div className="movie-detail-actions">

                            <button
                                type="button"
                                className="btn btn-primary movie-detail-watchlist"
                                onClick={handleAddToWatchlist}
                                disabled={addingToWatchlist}
                            >
                                {addingToWatchlist
                                    ? "Adding..."
                                    : "+ Add to Watchlist"}
                            </button>

                            {isOwner && (
                                <Link
                                    to={`/movies/${movie.id}/edit`}
                                    className="btn btn-secondary"
                                >
                                    Edit Movie
                                </Link>
                            )}

                            {isOwner && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    {deleting
                                        ? "Deleting..."
                                        : "Delete Movie"}
                                </button>
                            )}

                        </div>

                        {/* WATCHLIST MESSAGE */}
                        {/* {watchlistMessage && (
                            <div className="movie-detail-message">
                                {watchlistMessage}
                            </div>
                        )} */}

                    </div>

                </section>

            </div>
        </main>
    );
}