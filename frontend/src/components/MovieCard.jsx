import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    return (
        <article style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10, background: "#fff" }}>
        <Link to={`/movies/${movie.id}`}>
            <img
            src={movie.posterUrl || "https://placehold.co/300x450?text=Movie"}
            alt={movie.title}
            style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 8 }}
            />
        </Link>

        <h3 style={{ margin: "12px 0 8px" }}>
            <Link to={`/movies/${movie.id}`} style={{ color: "#111827", textDecoration: "none" }}>
            {movie.title}
            </Link>
        </h3>

        <p style={{ margin: 0 }}>{movie.releaseYear}</p>
        <p style={{ margin: "4px 0" }}>{movie.genres?.join(", ") || "General"}</p>
        <p style={{ margin: 0 }}>{movie.overview?.slice(0, 80) || "No overview yet."}</p>
        </article>
    );
}
