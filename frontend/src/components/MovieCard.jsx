import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";
import { watchlistApi } from "../services/api";

export default function MovieCard({ movie }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [addingToWatchlist, setAddingToWatchlist] = useState(false);
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);

    const handleAddToWatchlist = async (event) => {
        // Prevent the click from triggering the poster link
        event.preventDefault();
        event.stopPropagation();

        // Already added
        if (addedToWatchlist) {
            return;
        }

        // User is not logged in
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            setAddingToWatchlist(true);

            await watchlistApi.addToWatchlist({
                movieId: movie.id,
            });

            // Change + → ✓
            setAddedToWatchlist(true);

            showToast(
                "Movie added to your watchlist.",
                "success"
            );

        } catch (err) {
            showToast(
                err.message || "Failed to add movie.",
                "error"
            );
        } finally {
            setAddingToWatchlist(false);
        }
    };
    
    return (
        <article className="movie-card">

            {/* Poster */}            
            <div className="movie-card-poster-wrapper">

                <img
                    src={
                        movie.posterUrl ||
                        "https://placehold.co/300x450?text=Movie"
                    }
                    alt={movie.title}
                    className="movie-card-poster"
                />

                {/* Hover overlay */}
                <div className="movie-card-overlay">

                    {/* View Details */}
                    <Link
                        to={`/movies/${movie.id}`}
                        className="movie-card-view"
                    >
                        ▶ View Details
                    </Link>

                {/* Add to Watchlist */}
                <button
                    type="button"
                    className={`movie-card-watchlist ${
                            addedToWatchlist
                                ? "movie-card-watchlist-added"
                                : ""
                    }`}
                    onClick={handleAddToWatchlist}
                    disabled={
                        addingToWatchlist ||
                        addedToWatchlist
                    }
                    aria-label={
                        addedToWatchlist
                            ? "Added to Watchlist"
                            : "Add to Watchlist"
                    }
                    title={
                        addedToWatchlist
                            ? "Added to Watchlist"
                            : "Add to Watchlist"
                    }
                >
                    {addingToWatchlist
                        ? "…"
                        : addedToWatchlist
                            ? "✓"
                            : "+"}
                </button>
                        
                </div>

            </div>


            {/* Movie information */}
            <div className="movie-card-content">

                {/* Title */}
                <Link
                    to={`/movies/${movie.id}`}
                    className="movie-card-title"
                    title={movie.title}
                >
                    {movie.title}
                </Link>


                {/* Meta */}
                <div className="movie-card-meta">

                    <span>
                        {movie.releaseYear}
                    </span>

                    {movie.runtime && (
                        <>
                            <span className="movie-card-dot">
                                •
                            </span>

                            <span>
                                {movie.runtime} min
                            </span>
                        </>
                    )}

                </div>


                {/* Genres */}
                {movie.genres?.length > 0 && (
                    <div className="movie-card-genres">
                        {movie.genres.slice(0, 3).map((genre) => (
                            <span
                                key={genre}
                                className="movie-card-genre"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}


                {/* Overview */}
                {movie.overview && (
                    <p className="movie-card-overview">
                        {movie.overview}
                    </p>
                )}

            </div>

        </article>
    );
}