import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
        await login(form);
        navigate("/movies");
        } catch (err) {
        setError(err.message || "Login failed");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "60px auto", padding: 24, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}

            <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
            />

            <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            required
            />

            <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            </button>
        </form>

        <p style={{ marginTop: 16 }}>
            Need an account? <Link to="/register">Register</Link>
        </p>
        </div>
    );
}