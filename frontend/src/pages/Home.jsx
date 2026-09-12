import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import TrendingPeople from "../components/TrendingPeople";
import { movieApi } from "../services/api";

export default function Home({
    search,
    genre,
}) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentSlide, setCurrentSlide] = useState(0);

    const moviesPerSlide = 5;

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
                    limit: 20,
                    search: search || undefined,
                    genre: genre || undefined,
                });

                setMovies(result.movies || []);

                setCurrentSlide(0);
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

    const totalSlides = Math.ceil(
        movies.length / moviesPerSlide
    );

    const handlePrevious = () => {
        setCurrentSlide((current) =>
            Math.max(current - 1, 0)
        );
    };

    const handleNext = () => {
        setCurrentSlide((current) =>
            Math.min(current + 1, totalSlides - 1)
        );
    };
    
    return (
        <main className="home-page">
            {/* HERO */}
            <section className="home-hero">
                <div className="container">
                    <div className="home-hero-content">
                        
                        {/* LABEL */}
                        <span className="home-hero-label">
                            YOUR PERSONAL MOVIE SPACE
                        </span>

                        {/* TITLE */}
                        <h1 className="home-hero-title">
                            Find your next
                            <span> favorite movie.</span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="home-hero-description">
                            Discover new movies, explore your favorite actors,
                            and save everything you want to watch — all in one place.
                        </p>

                        {/* ACTIONS */}
                        <div className="home-hero-actions">

                            <a
                                href="/movies"
                                className="home-hero-button home-hero-button-primary"
                            >
                                <span>▶</span>
                                Explore Movies
                            </a>

                            <a 
                                href="/watchlist"
                                className="home-hero-button home-hero-button-secondary"
                            >
                                <span>♡</span>
                                My Watchlist
                            </a>

                        </div>

                        {/* STATS */}
                        <div className="home-hero-stats">

                            <div className="home-hero-stat">
                                <strong>12,400+</strong>
                                <span>MOVIES IN LIBRARY</span>
                            </div>

                            <div className="home-hero-stat">
                                <strong>30+</strong>
                                <span>GENRES</span>
                            </div>

                            <div className="home-hero-stat">
                                <strong>Daily</strong>
                                <span>NEW UPDATES</span>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <TrendingPeople />

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

                    {!loading && !error && movies.length > 0 && (
                        <div className="movie-carousel">

                            {/* VIEWPORT */}
                            <div className="movie-carousel-viewport">

                                {/* TRACK */}
                                <div 
                                    className="movie-carousel-track" 
                                    style={{
                                        transform: `translateX(-${currentSlide * 100}%)`,
                                    }}
                                >
                                    {/* CREATE SLIDES */}
                                    {Array.from({
                                        length: totalSlides,
                                    }).map((_, index) => {

                                        const startIndex = 
                                            index * moviesPerSlide;

                                        const slideMovies = 
                                            movies.slice(
                                                startIndex,
                                                startIndex + moviesPerSlide
                                            );
                                        
                                        return (
                                            <div 
                                                className="movie-carousel-slide"
                                                key={index}
                                            >
                                                <MovieList
                                                    movies={slideMovies}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>

                        </div>
                        

                        {/* NAVIGATION ARROWS FOR HOME PAGE */}
                        {totalSlides > 1 && (
                            <div className="movie-section-navigation">
                                    
                                <button
                                    type="button"
                                    className="movie-arrow-button"
                                    aria-label="Show previous movies"
                                    disabled={currentSlide === 0}
                                    onClick={handlePrevious}
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    className="movie-arrow-button"
                                    aria-label="Show next movies"
                                    disabled={currentSlide === totalSlides - 1}
                                    onClick={handleNext}
                                >
                                    →
                                </button>

                            </div>
                        )}
                    </div>
                            
                )}
                    
                {!loading && !error && movies.length === 0 && (
                    <div className="empty-state">
                        No movies found.
                    </div>
                )}
                </div>
            </section>
        </main>
    );
}