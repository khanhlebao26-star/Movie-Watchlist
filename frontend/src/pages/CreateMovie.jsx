import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { movieApi } from "../services/api";

export default function CreateMovie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        title: "",
        overview: "",
        releaseYear: "",
        genres: "",
        runtime: "",
        posterUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingMovie, setLoadingMovie] = useState(isEdit);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    /* =====================================================
       FETCH MOVIE WHEN EDITING
    ===================================================== */

    useEffect(() => {
        if (!isEdit) {
            return;
        }

        const fetchMovie = async () => {
            try {
                setLoadingMovie(true);
                setError("");

                const result =
                    await movieApi.getMovieById(id);

                const movie = result.movie;

                setForm({
                    title: movie.title || "",
                    overview: movie.overview || "",
                    releaseYear:
                        movie.releaseYear || "",
                    genres:
                        movie.genres?.join(", ") || "",
                    runtime: movie.runtime || "",
                    posterUrl:
                        movie.posterUrl || "",
                });
            } catch (err) {
                setError(
                    err.message ||
                        "Failed to load movie."
                );
            } finally {
                setLoadingMovie(false);
            }
        };

        fetchMovie();
    }, [id, isEdit]);

    /* =====================================================
       HANDLE INPUT
    ===================================================== */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }

        if (success) {
            setSuccess("");
        }
    };

    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        /* Frontend validation */

        if (!form.title.trim()) {
            setError("Movie title is required.");
            return;
        }

        if (!form.releaseYear) {
            setError(
                "Release year is required."
            );
            return;
        }

        if (
            Number(form.releaseYear) < 1888 ||
            Number(form.releaseYear) >
                new Date().getFullYear() + 10
        ) {
            setError(
                "Please enter a valid release year."
            );
            return;
        }

        if (
            form.runtime &&
            Number(form.runtime) <= 0
        ) {
            setError(
                "Runtime must be greater than 0."
            );
            return;
        }

        /* Prepare payload */

        const payload = {
            title: form.title.trim(),

            overview:
                form.overview.trim() || undefined,

            releaseYear:
                Number(form.releaseYear),

            genres: form.genres
                .split(",")
                .map((genre) => genre.trim())
                .filter(Boolean),

            runtime: form.runtime
                ? Number(form.runtime)
                : undefined,

            posterUrl:
                form.posterUrl.trim() || undefined,
        };

        try {
            setLoading(true);

            if (isEdit) {
                await movieApi.updateMovie(
                    id,
                    payload
                );

                setSuccess(
                    "Movie updated successfully."
                );

                setTimeout(() => {
                    navigate(`/movies/${id}`);
                }, 700);
            } else {
                const result =
                    await movieApi.createMovie(
                        payload
                    );

                const createdMovie =
                    result.movie;

                navigate(
                    `/movies/${createdMovie.id}`
                );
            }
        } catch (err) {
            setError(
                err.message ||
                    `Failed to ${
                        isEdit
                            ? "update"
                            : "create"
                    } movie.`
            );
        } finally {
            setLoading(false);
        }
    };

    /* =====================================================
       LOADING MOVIE FOR EDIT
    ===================================================== */

    if (loadingMovie) {
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

    return (
        <main className="movie-form-page">

            <div className="container">

                {/* =================================================
                    BACK
                ================================================= */}

                <Link
                    to={
                        isEdit
                            ? `/movies/${id}`
                            : "/movies"
                    }
                    className="movie-form-back"
                >
                    ←{" "}
                    {isEdit
                        ? "Back to Movie"
                        : "Back to Movies"}
                </Link>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="movie-form-header">

                    <div>
                        <span className="movie-form-label">
                            {isEdit
                                ? "MOVIE MANAGEMENT"
                                : "ADD TO COLLECTION"}
                        </span>

                        <h1 className="page-title">
                            {isEdit
                                ? "Edit Movie"
                                : "Add New Movie"}
                        </h1>

                        <p className="page-description">
                            {isEdit
                                ? "Update the information for this movie."
                                : "Add a new movie to your collection."}
                        </p>
                    </div>

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="error-message movie-form-message">
                        {error}
                    </div>
                )}

                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (
                    <div className="movie-form-success">
                        {success}
                    </div>
                )}

                {/* =================================================
                    FORM LAYOUT
                ================================================= */}

                <form
                    className="movie-form-layout"
                    onSubmit={handleSubmit}
                >

                    {/* =================================================
                        LEFT
                    ================================================= */}

                    <section className="movie-form-card">

                        <div className="movie-form-card-header">

                            <h2>
                                Movie Information
                            </h2>

                            <p>
                                Enter the basic details
                                about the movie.
                            </p>

                        </div>

                        <div className="movie-form-fields">

                            {/* TITLE */}

                            <div className="form-group">

                                <label
                                    htmlFor="title"
                                    className="form-label"
                                >
                                    Movie Title
                                    <span className="required">
                                        *
                                    </span>
                                </label>

                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={
                                        form.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. Inception"
                                    required
                                />

                            </div>

                            {/* RELEASE YEAR */}

                            <div className="movie-form-row">

                                <div className="form-group">

                                    <label
                                        htmlFor="releaseYear"
                                        className="form-label"
                                    >
                                        Release Year
                                        <span className="required">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        id="releaseYear"
                                        name="releaseYear"
                                        type="number"
                                        value={
                                            form.releaseYear
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. 2010"
                                        min="1888"
                                        max={
                                            new Date().getFullYear() +
                                            10
                                        }
                                        required
                                    />

                                </div>

                                {/* RUNTIME */}

                                <div className="form-group">

                                    <label
                                        htmlFor="runtime"
                                        className="form-label"
                                    >
                                        Runtime
                                    </label>

                                    <div className="input-with-suffix">

                                        <input
                                            id="runtime"
                                            name="runtime"
                                            type="number"
                                            value={
                                                form.runtime
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="148"
                                            min="1"
                                        />

                                        <span>
                                            min
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* GENRES */}

                            <div className="form-group">

                                <label
                                    htmlFor="genres"
                                    className="form-label"
                                >
                                    Genres
                                </label>

                                <input
                                    id="genres"
                                    name="genres"
                                    type="text"
                                    value={
                                        form.genres
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Action, Drama, Sci-Fi"
                                />

                                <p className="form-help">
                                    Separate multiple
                                    genres with commas.
                                </p>

                            </div>

                            {/* OVERVIEW */}

                            <div className="form-group">

                                <label
                                    htmlFor="overview"
                                    className="form-label"
                                >
                                    Overview
                                </label>

                                <textarea
                                    id="overview"
                                    name="overview"
                                    value={
                                        form.overview
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Write a short description of the movie..."
                                    rows="7"
                                />

                                <p className="form-help">
                                    Give viewers a short
                                    description of the movie.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        RIGHT
                    ================================================= */}

                    <aside className="movie-form-sidebar">

                        {/* POSTER CARD */}

                        <section className="movie-form-card">

                            <div className="movie-form-card-header">

                                <h2>
                                    Movie Poster
                                </h2>

                                <p>
                                    Add a poster image
                                    using its URL.
                                </p>

                            </div>

                            <div className="movie-poster-preview">

                                {form.posterUrl ? (
                                    <img
                                        src={form.posterUrl}
                                        alt="Movie poster preview"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://placehold.co/400x600?text=Invalid+Poster";
                                        }}
                                    />
                                ) : (
                                    <div className="movie-poster-placeholder">

                                        <span>
                                            Poster
                                        </span>

                                        <small>
                                            Preview
                                        </small>

                                    </div>
                                )}

                            </div>

                            <div className="form-group">

                                <label
                                    htmlFor="posterUrl"
                                    className="form-label"
                                >
                                    Poster URL
                                </label>

                                <input
                                    id="posterUrl"
                                    name="posterUrl"
                                    type="url"
                                    value={
                                        form.posterUrl
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://example.com/poster.jpg"
                                />

                                <p className="form-help">
                                    Use a direct URL to
                                    the poster image.
                                </p>

                            </div>

                        </section>

                        {/* ACTIONS */}

                        <section className="movie-form-actions">

                            <Link
                                to={
                                    isEdit
                                        ? `/movies/${id}`
                                        : "/movies"
                                }
                                className="btn btn-secondary"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading
                                    ? isEdit
                                        ? "Saving..."
                                        : "Creating..."
                                    : isEdit
                                    ? "Save Changes"
                                    : "Create Movie"}
                            </button>

                        </section>

                    </aside>

                </form>

            </div>

        </main>
    );
}