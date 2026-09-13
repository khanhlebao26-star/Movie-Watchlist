import { Link } from "react-router-dom";

export default function HomeHero() {
    return (
        <section className="home-hero">
            <div className="container">

                <div className="home-hero-content">

                    {/* LABEL */}
                    <span className="home-hero-label">
                        YOUR PERSONAL MOVIE SPACE
                    </span>

                    {/* TITLE */}
                    <h1 className="home-hero-title">
                        Find your next
                        <span> favorite movie.</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="home-hero-description">
                        Discover new movies, explore your favorite actors,
                        and save everything you want to watch — all in one place.
                    </p>

                    {/* ACTIONS */}
                    <div className="home-hero-actions">

                        <Link
                            to="/movies"
                            className="home-hero-button home-hero-button-primary"
                        >
                            <span>▶</span>
                            Explore Movies
                        </Link>

                        <Link
                            to="/watchlist"
                            className="home-hero-button home-hero-button-secondary"
                        >
                            <span>♡</span>
                            My Watchlist
                        </Link>

                    </div>

                    {/* STATS */}
                    <div className="home-hero-stats">

                        <div className="home-hero-stat">
                            <strong>12,400+</strong>
                            <span>MOVIES IN LIBRARY</span>
                        </div>

                        <div className="home-hero-stat">
                            <strong>30+</strong>
                            <span>GENRES</span>
                        </div>

                        <div className="home-hero-stat">
                            <strong>Daily</strong>
                            <span>NEW UPDATES</span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}