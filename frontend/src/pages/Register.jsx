import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
        await register(form);
        navigate("/movies");
        } catch (err) {
        setError(err.message || "Registration failed");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "60px auto", padding: 24, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}

            <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            />

            <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            />

            <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            />

            <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
            </button>
        </form>

        <p style={{ marginTop: 16 }}>
            Already have an account? <Link to="/login">Login</Link>
        </p>
        </div>
    );
}
