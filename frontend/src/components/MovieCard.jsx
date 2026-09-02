import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    return (
        <article className="movie-card">

            {/* Poster */}
            <Link
                to={`/movies/${movie.id}`}
                className="movie-card-poster-link"
            >
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
                        <span className="movie-card-view">
                            View Details
                        </span>
                    </div>

                </div>
            </Link>


            {/* Movie information */}
            <div className="movie-card-content">

                <Link
                    to={`/movies/${movie.id}`}
                    className="movie-card-title"
                    title={movie.title}
                >
                    {movie.title}
                </Link>


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