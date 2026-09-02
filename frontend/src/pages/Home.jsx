import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import { useAuth } from "../context/useAuth";
import { movieApi } from "../services/api";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchMovies = async () => {
        try {
            const result = await movieApi.getMovies({ page: 1, limit: 10 });
            setMovies(result.movies || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchMovies();
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div style={{ padding: 24 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12, flexWrap: "wrap" }}>
            <div>
            <h1 style={{ margin: 0 }}>Movie Watchlist</h1>
            <p style={{ margin: "8px 0 0" }}>Discover and track movies you want to watch</p>
            </div>

            <nav style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {user ? (
                <>
                <span>Hi, {user.name}</span>
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/movies/new">Add movie</Link>
                <button type="button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
            )}
            </nav>
        </header>

        {loading ? (
            <div>Loading movies...</div>
        ) : (
            <MovieList movies={movies} />
        )}
        </div>
    );
}