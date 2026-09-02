import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { watchlistApi } from "../services/api";

export default function Watchlist() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWatchlist = async () => {
        try {
        const result = await watchlistApi.getWatchlist();
        setItems(result.items || []);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const handleRemove = async (itemId) => {
        try {
        await watchlistApi.removeFromWatchlist(itemId);
        setItems((prev) => prev.filter((item) => item.id !== itemId));
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <Link to="/movies">← Back to movies</Link>
        <h1>My Watchlist</h1>

        {loading ? (
            <p>Loading your watchlist...</p>
        ) : items.length === 0 ? (
            <p>Your watchlist is empty.</p>
        ) : (
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
            {items.map((item) => (
                <li key={item.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16, display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div>
                    <Link to={`/movies/${item.movieId}`}>{item.movie?.title || "Movie"}</Link>
                    <div style={{ color: "#666" }}>{item.status}</div>
                </div>

                <button type="button" onClick={() => handleRemove(item.id)}>
                    Remove
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
