import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { movieApi } from "../services/api";

export default function Home() {
    const [movies, setMovies] = useState([]);

    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");

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
                    page: 1,
                    limit: 10,
                    search: search || undefined,
                    genre: genre || undefined,
                });

                setMovies(result.movies || []);

            } catch (err) {
                setError(
                    err.message || "Failed to load movies."
                );

                setMovies([]);

            } finally {
                setLoading(false);
            }
        }, 400);


        return () => {
            clearTimeout(timer);
        };

    }, [search, genre]);


    /* =========================================
       CLEAR FILTER
    ========================================= */

    const handleClearFilters = () => {
        setSearch("");
        setGenre("");
    };


    return (
        <main className="home-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="home-hero">

                <div className="container">

                    <div className="home-hero-content">

                        <span className="home-hero-label">
                            YOUR PERSONAL MOVIE SPACE
                        </span>


                        <h1 className="home-hero-title">
                            Find your next
                            <span> favorite movie.</span>
                        </h1>


                        <p className="home-hero-description">
                            Discover movies, explore new stories,
                            and keep track of everything you want to watch.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                MOVIE SECTION
            ===================================================== */}

            <section className="home-movies">

                <div className="container">

                    {/* Section header */}

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


                    {/* =================================================
                        SEARCH + FILTER
                    ================================================= */}

                    <div className="movie-filters">

                        {/* Search */}

                        <div className="movie-search">

                            <span className="movie-search-icon">
                                🔍
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search movies..."
                                aria-label="Search movies"
                            />

                        </div>


                        {/* Genre */}

                        <select
                            value={genre}
                            onChange={(e) =>
                                setGenre(e.target.value)
                            }
                            className="movie-genre-filter"
                            aria-label="Filter by genre"
                        >

                            <option value="">
                                All Genres
                            </option>

                            <option value="Action">
                                Action
                            </option>

                            <option value="Adventure">
                                Adventure
                            </option>

                            <option value="Animation">
                                Animation
                            </option>

                            <option value="Comedy">
                                Comedy
                            </option>

                            <option value="Crime">
                                Crime
                            </option>

                            <option value="Drama">
                                Drama
                            </option>

                            <option value="Fantasy">
                                Fantasy
                            </option>

                            <option value="Horror">
                                Horror
                            </option>

                            <option value="Romance">
                                Romance
                            </option>

                            <option value="Sci-Fi">
                                Sci-Fi
                            </option>

                            <option value="Thriller">
                                Thriller
                            </option>

                        </select>


                        {/* Clear filters */}

                        {(search || genre) && (
                            <button
                                type="button"
                                className="btn btn-ghost movie-clear-button"
                                onClick={handleClearFilters}
                            >
                                Clear
                            </button>
                        )}

                    </div>


                    {/* =================================================
                        MOVIE RESULT
                    ================================================= */}

                    {loading && (
                        <div className="loading">
                            Loading movies...
                        </div>
                    )}


                    {!loading && error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    {!loading && !error && (
                        <MovieList movies={movies} />
                    )}

                </div>

            </section>

        </main>
    );
}