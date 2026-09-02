import MovieCard from "./MovieCard";

export default function MovieList({ movies = [] }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>
    );
}
