import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { movieApi } from "../services/api";

const emptyForm = {
    title: "",
    overview: "",
    releaseYear: "",
    genres: "",
    runtime: "",
    posterUrl: "",
};

export default function CreateMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(Boolean(id));
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isEdit) {
        setLoading(false);
        return;
        }

        const fetchMovie = async () => {
        try {
            const result = await movieApi.getMovieById(id);
            const movie = result.movie;

            setForm({
            title: movie.title || "",
            overview: movie.overview || "",
            releaseYear: movie.releaseYear || "",
            genres: Array.isArray(movie.genres) ? movie.genres.join(", ") : "",
            runtime: movie.runtime || "",
            posterUrl: movie.posterUrl || "",
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

    fetchMovie();
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
        const payload = {
            title: form.title.trim(),
            overview: form.overview?.trim() || undefined,
            releaseYear: Number(form.releaseYear),
            genres: form.genres
            .split(",")
            .map((genre) => genre.trim())
            .filter(Boolean),
            runtime: form.runtime ? Number(form.runtime) : undefined,
            posterUrl: form.posterUrl?.trim() || undefined,
        };

        if (isEdit) {
            await movieApi.updateMovie(id, payload);
        } else {
            await movieApi.createMovie(payload);
        }

        navigate("/movies");
        } catch (err) {
        console.error(err);
        alert(err.message || "Failed to save movie");
        } finally {
        setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
        <Link to="/movies">← Back to movies</Link>
        <h1>{isEdit ? "Edit Movie" : "Create Movie"}</h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="overview" value={form.overview} onChange={handleChange} placeholder="Overview" rows={5} />
            <input name="releaseYear" type="number" value={form.releaseYear} onChange={handleChange} placeholder="Release Year" required />
            <input name="genres" value={form.genres} onChange={handleChange} placeholder="Genres (comma separated)" />
            <input name="runtime" type="number" value={form.runtime} onChange={handleChange} placeholder="Runtime in minutes" />
            <input name="posterUrl" value={form.posterUrl} onChange={handleChange} placeholder="Poster URL" />
            <button type="submit" disabled={submitting}>
            {submitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Movie")}
            </button>
        </form>
        </div>
    );
}
