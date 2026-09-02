import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await login(form);
            navigate("/movies");
        } catch (err) {
            setError(err.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">

            <div className="auth-container">

                {/* LOGO */}
                <Link to="/movies" className="auth-logo">
                    Movie<span>List</span>
                </Link>

                {/* CARD */}
                <section className="auth-card">

                    <div className="auth-header">

                        <h1 className="auth-title">
                            Welcome back
                        </h1>

                        <p className="auth-description">
                            Sign in to continue to your movie collection.
                        </p>

                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        {/* EMAIL */}
                        <div className="form-group">

                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                            />

                        </div>

                        {/* PASSWORD */}
                        <div className="form-group">

                            <div className="auth-label-row">

                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>

                            </div>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />

                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="btn btn-primary auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    {/* REGISTER LINK */}
                    <div className="auth-footer">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create an account
                        </Link>

                    </div>

                </section>

            </div>

        </main>
    );
}