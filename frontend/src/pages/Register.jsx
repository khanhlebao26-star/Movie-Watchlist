import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { register } = useAuth();

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
            await register(form);
            navigate("/movies");
        } catch (err) {
            setError(
                err.message || "Registration failed."
            );
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
                            Create an account
                        </h1>

                        <p className="auth-description">
                            Create your account and start building your movie list.
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

                        {/* NAME */}
                        <div className="form-group">

                            <label
                                htmlFor="name"
                                className="form-label"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                autoComplete="name"
                                required
                            />

                        </div>

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

                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                autoComplete="new-password"
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
                                ? "Creating account..."
                                : "Create Account"}
                        </button>

                    </form>

                    {/* LOGIN LINK */}
                    <div className="auth-footer">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>

                </section>

            </div>

        </main>
    );
}