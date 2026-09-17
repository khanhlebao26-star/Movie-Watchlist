import { useToast } from "../context/useToast";
import { upcomingMovies } from "../data/upcomingMovies";
import "../styles/upcoming-release.css";

export default function UpcomingReleases() {
    const { showToast } = useToast();

    const handleRemind = (movieTitle) => {
        showToast(
            `Reminder set for "${movieTitle}".`,
            "success"
        );
    };

    const formatReleaseDate = (date) => {
        const [, month, day] = date.split("-");

        return `${day}.${month}`;
};

    return (
        <section className="upcoming-releases">
            <div className="container">

                <div className="upcoming-releases-header">
                    <span className="upcoming-releases-label">
                        RELEASE SCHEDULE
                    </span>

                    <h2 className="upcoming-releases-title">
                        Upcoming Releases
                    </h2>

                    <p className="upcoming-releases-description">
                        Stay up to date with upcoming movies.
                    </p>
                </div>

                <div className="upcoming-releases-list">
                    {upcomingMovies.map((movie) => (
                        <article
                            key={movie.id}
                            className="upcoming-release-item"
                        >
                            <div className="upcoming-release-date">
                                {formatReleaseDate(movie.releaseDate)}
                            </div>

                            <div className="upcoming-release-info">
                                <h3>
                                    {movie.title}
                                </h3>

                                <p>
                                    {movie.genres.join(" • ")}
                                    {" — "}
                                    {movie.runtime} min
                                </p>
                            </div>

                            <button
                                type="button"
                                className="upcoming-release-remind"
                                onClick={() =>
                                    handleRemind(movie.title)
                                }
                            >
                                Remind Me
                            </button>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}