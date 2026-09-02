import MovieCard from "./MovieCard";

export default function MovieList({ movies = [] }) {
    if (movies.length === 0) {
        return (
            <div className="empty-state">
                <h3 className="empty-state-title">
                    No movies found
                </h3>

                <p className="empty-state-description">
                    There are no movies to display yet.
                </p>
            </div>
        );
    }

    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </div>
    );
}