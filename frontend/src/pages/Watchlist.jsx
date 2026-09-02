import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { watchlistApi } from "../services/api";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    const [filter, setFilter] = useState("ALL");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    /* =====================================================
       FETCH WATCHLIST
    ===================================================== */

    const fetchWatchlist = async () => {
        try {
            setLoading(true);
            setError("");

            const result =
                await watchlistApi.getWatchlist();

            setWatchlist(result.watchlist || []);
        } catch (err) {
            setError(
                err.message || "Failed to load watchlist."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    /* =====================================================
       UPDATE WATCHLIST ITEM
    ===================================================== */

    const handleUpdate = async (
        id,
        payload
    ) => {
        try {
            setUpdatingId(id);

            const result =
                await watchlistApi.updateWatchlistItem(
                    id,
                    payload
                );

            const updatedItem = result.watchlistItem;

            setWatchlist((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              ...updatedItem,
                          }
                        : item
                )
            );
        } catch (err) {
            setError(
                err.message ||
                    "Failed to update watchlist."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    /* =====================================================
       DELETE WATCHLIST ITEM
    ===================================================== */

    const handleRemove = async (id) => {
        const confirmed = window.confirm(
            "Remove this movie from your watchlist?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await watchlistApi.removeFromWatchlist(id);

            setWatchlist((prev) =>
                prev.filter(
                    (item) => item.id !== id
                )
            );
        } catch (err) {
            setError(
                err.message ||
                    "Failed to remove movie."
            );
        } finally {
            setDeletingId(null);
        }
    };

    /* =====================================================
       FILTER
    ===================================================== */

    const filteredWatchlist =
        filter === "ALL"
            ? watchlist
            : watchlist.filter(
                  (item) =>
                      item.status === filter
              );

    /* =====================================================
       STATS
    ===================================================== */

    const stats = {
        all: watchlist.length,

        planned: watchlist.filter(
            (item) =>
                item.status === "PLANNED"
        ).length,

        watching: watchlist.filter(
            (item) =>
                item.status === "WATCHING"
        ).length,

        completed: watchlist.filter(
            (item) =>
                item.status === "COMPLETED"
        ).length,

        dropped: watchlist.filter(
            (item) =>
                item.status === "DROPPED"
        ).length,
    };

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <main className="page">
                <div className="container">
                    <div className="loading">
                        Loading your watchlist...
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="watchlist-page">

            <div className="container">

                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="watchlist-header">

                    <div className="page-header-content">

                        <span className="watchlist-label">
                            YOUR COLLECTION
                        </span>

                        <h1 className="page-title">
                            My Watchlist
                        </h1>

                        <p className="page-description">
                            Keep track of movies you want
                            to watch and the ones you've
                            already seen.
                        </p>

                    </div>

                    <Link
                        to="/movies"
                        className="btn btn-primary"
                    >
                        + Browse Movies
                    </Link>

                </section>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="error-message watchlist-error">
                        {error}
                    </div>
                )}

                {/* =================================================
                    STATS
                ================================================= */}

                <section className="watchlist-stats">

                    <button
                        type="button"
                        className={`watchlist-stat ${
                            filter === "ALL"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setFilter("ALL")
                        }
                    >
                        <span className="watchlist-stat-number">
                            {stats.all}
                        </span>

                        <span className="watchlist-stat-label">
                            All Movies
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`watchlist-stat ${
                            filter === "PLANNED"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setFilter("PLANNED")
                        }
                    >
                        <span className="watchlist-stat-number">
                            {stats.planned}
                        </span>

                        <span className="watchlist-stat-label">
                            Planned
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`watchlist-stat ${
                            filter === "WATCHING"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setFilter("WATCHING")
                        }
                    >
                        <span className="watchlist-stat-number">
                            {stats.watching}
                        </span>

                        <span className="watchlist-stat-label">
                            Watching
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`watchlist-stat ${
                            filter === "COMPLETED"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setFilter("COMPLETED")
                        }
                    >
                        <span className="watchlist-stat-number">
                            {stats.completed}
                        </span>

                        <span className="watchlist-stat-label">
                            Completed
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`watchlist-stat ${
                            filter === "DROPPED"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setFilter("DROPPED")
                        }
                    >
                        <span className="watchlist-stat-number">
                            {stats.dropped}
                        </span>

                        <span className="watchlist-stat-label">
                            Dropped
                        </span>
                    </button>

                </section>

                {/* =================================================
                    EMPTY WATCHLIST
                ================================================= */}

                {watchlist.length === 0 && (
                    <div className="watchlist-empty">

                        <div className="watchlist-empty-icon">
                            +
                        </div>

                        <h2>
                            Your watchlist is empty
                        </h2>

                        <p>
                            Start adding movies you want
                            to watch.
                        </p>

                        <Link
                            to="/movies"
                            className="btn btn-primary"
                        >
                            Browse Movies
                        </Link>

                    </div>
                )}

                {/* =================================================
                    NO FILTER RESULTS
                ================================================= */}

                {watchlist.length > 0 &&
                    filteredWatchlist.length === 0 && (
                        <div className="watchlist-empty">

                            <h2>
                                No movies in this category
                            </h2>

                            <p>
                                Try selecting another
                                status.
                            </p>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    setFilter("ALL")
                                }
                            >
                                View All Movies
                            </button>

                        </div>
                    )}

                {/* =================================================
                    WATCHLIST
                ================================================= */}

                {filteredWatchlist.length > 0 && (
                    <section className="watchlist-list">

                        {filteredWatchlist.map(
                            (item) => {

                                const movie =
                                    item.movie;

                                return (
                                    <article
                                        key={item.id}
                                        className="watchlist-item"
                                    >

                                        {/* POSTER */}

                                        <Link
                                            to={`/movies/${movie.id}`}
                                            className="watchlist-poster-link"
                                        >
                                            <div className="watchlist-poster-wrapper">

                                                <img
                                                    src={
                                                        movie.posterUrl ||
                                                        "https://placehold.co/240x360?text=Movie"
                                                    }
                                                    alt={
                                                        movie.title
                                                    }
                                                    className="watchlist-poster"
                                                />

                                            </div>
                                        </Link>

                                        {/* CONTENT */}

                                        <div className="watchlist-content">

                                            <div className="watchlist-main">

                                                <Link
                                                    to={`/movies/${movie.id}`}
                                                    className="watchlist-title"
                                                >
                                                    {
                                                        movie.title
                                                    }
                                                </Link>

                                                <div className="watchlist-meta">

                                                    <span>
                                                        {
                                                            movie.releaseYear
                                                        }
                                                    </span>

                                                    {movie.runtime && (
                                                        <>
                                                            <span>
                                                                •
                                                            </span>

                                                            <span>
                                                                {
                                                                    movie.runtime
                                                                }{" "}
                                                                min
                                                            </span>
                                                        </>
                                                    )}

                                                </div>

                                                {movie.genres?.length >
                                                    0 && (
                                                    <div className="watchlist-genres">

                                                        {movie.genres
                                                            .slice(
                                                                0,
                                                                4
                                                            )
                                                            .map(
                                                                (
                                                                    genre
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            genre
                                                                        }
                                                                        className="watchlist-genre"
                                                                    >
                                                                        {
                                                                            genre
                                                                        }
                                                                    </span>
                                                                )
                                                            )}

                                                    </div>
                                                )}

                                                {movie.overview && (
                                                    <p className="watchlist-overview">
                                                        {
                                                            movie.overview
                                                        }
                                                    </p>
                                                )}

                                            </div>

                                            {/* CONTROLS */}

                                            <div className="watchlist-controls">

                                                {/* STATUS */}

                                                <div className="watchlist-control">

                                                    <label>
                                                        Status
                                                    </label>

                                                    <select
                                                        value={
                                                            item.status
                                                        }
                                                        disabled={
                                                            updatingId ===
                                                            item.id
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleUpdate(
                                                                item.id,
                                                                {
                                                                    status:
                                                                        e
                                                                            .target
                                                                            .value,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <option value="PLANNED">
                                                            Planned
                                                        </option>

                                                        <option value="WATCHING">
                                                            Watching
                                                        </option>

                                                        <option value="COMPLETED">
                                                            Completed
                                                        </option>

                                                        <option value="DROPPED">
                                                            Dropped
                                                        </option>
                                                    </select>

                                                </div>

                                                {/* RATING */}

                                                <div className="watchlist-control">

                                                    <label>
                                                        Rating
                                                    </label>

                                                    <select
                                                        value={
                                                            item.rating ||
                                                            ""
                                                        }
                                                        disabled={
                                                            updatingId ===
                                                            item.id
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleUpdate(
                                                                item.id,
                                                                {
                                                                    rating:
                                                                        e
                                                                            .target
                                                                            .value
                                                                            ? Number(
                                                                                  e
                                                                                      .target
                                                                                      .value
                                                                              )
                                                                            : null,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Not rated
                                                        </option>

                                                        <option value="1">
                                                            1 / 10
                                                        </option>

                                                        <option value="2">
                                                            2 / 10
                                                        </option>

                                                        <option value="3">
                                                            3 / 10
                                                        </option>

                                                        <option value="4">
                                                            4 / 10
                                                        </option>

                                                        <option value="5">
                                                            5 / 10
                                                        </option>

                                                        <option value="6">
                                                            6 / 10
                                                        </option>

                                                        <option value="7">
                                                            7 / 10
                                                        </option>

                                                        <option value="8">
                                                            8 / 10
                                                        </option>

                                                        <option value="9">
                                                            9 / 10
                                                        </option>

                                                        <option value="10">
                                                            10 / 10
                                                        </option>
                                                    </select>

                                                </div>

                                                {/* REMOVE */}

                                                <button
                                                    type="button"
                                                    className="btn btn-danger watchlist-remove"
                                                    disabled={
                                                        deletingId ===
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        handleRemove(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    {deletingId ===
                                                    item.id
                                                        ? "Removing..."
                                                        : "Remove"}
                                                </button>

                                            </div>

                                        </div>

                                    </article>
                                );
                            }
                        )}

                    </section>
                )}

            </div>

        </main>
    );
}