import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { movieApi, watchlistApi } from "../services/api";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
        try {
            const result = await movieApi.getMovieById(id);
            setMovie(result.movie);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchMovie();
    }, [id]);

    const handleAddToWatchlist = async () => {
        if (!user) {
        navigate("/login");
        return;
        }

        setAdding(true);
        setMessage("");

        try {
        await watchlistApi.addToWatchlist({ movieId: id, status: "PLANNED" });
        setMessage("Added to your watchlist.");
        } catch (err) {
        setMessage(err.message || "Unable to add to watchlist.");
        } finally {
        setAdding(false);
        }
    };

    if (loading) return <div>Loading movie...</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
        <Link to="/movies">← Back to movies</Link>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, marginTop: 20 }}>
            <img
            src={movie.posterUrl || "https://placehold.co/600x900?text=Poster"}
            alt={movie.title}
            style={{ width: "100%", borderRadius: 12 }}
            />

            <div>
            <h1>{movie.title}</h1>
            <p>{movie.releaseYear}</p>
            <p>{movie.genres?.join(", ") || "General"}</p>
            <p>{movie.overview || "No overview available."}</p>
            <p>Runtime: {movie.runtime || "N/A"} min</p>

            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                <button type="button" onClick={handleAddToWatchlist} disabled={adding}>
                {adding ? "Adding..." : "Add to watchlist"}
                </button>

                {user && movie.createdBy === user.id && (
                <Link to={`/movies/${id}/edit`}>
                    <button type="button">Edit movie</button>
                </Link>
                )}
            </div>

            {message && <p style={{ marginTop: 16 }}>{message}</p>}
            </div>
        </div>
        </div>
    );
}
