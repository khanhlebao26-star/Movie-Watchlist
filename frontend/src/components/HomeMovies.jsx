import { useEffect, useState } from "react";

import { movieApi } from "../services/api";
import MovieList from "./MovieList";

export default function HomeMovies({
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

    /* =========================================
       CAROUSEL
    ========================================= */

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
            Math.min(
                current + 1,
                totalSlides - 1
            )
        );
    };

    return (
        <section className="home-movies">

            <div className="container">

                {/* HEADER */}
                <div className="home-section-header">

                    <div className="page-header-content">

                        <h2 className="home-section-title">
                            Discover Movies
                        </h2>

                        <p className="home-section-description">
                            Explore movies and find something worth watching.
                        </p>

                    </div>

                    {/* NAVIGATION */}
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
                                disabled={
                                    currentSlide === totalSlides - 1
                                }
                                onClick={handleNext}
                            >
                                →
                            </button>

                        </div>
                    )}

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
                {!loading &&
                    !error &&
                    movies.length > 0 && (

                    <div className="movie-carousel">

                        <div className="movie-carousel-viewport">

                            <div
                                className="movie-carousel-track"
                                style={{
                                    transform:
                                        `translateX(-${currentSlide * 100}%)`,
                                }}
                            >

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

                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    !error &&
                    movies.length === 0 && (
                    <div className="empty-state">
                        No movies found.
                    </div>
                )}

            </div>

        </section>
    );
}