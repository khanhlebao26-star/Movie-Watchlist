import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">

                {/* BRAND */}
                <div className="footer-brand">
                    <Link to="/movies" className="footer-logo">
                        Movie<span>List</span>
                    </Link>

                    <p className="footer-description">
                        Your personal movie watchlist.
                        Discover movies, save your favorites,
                        and keep track of what you want to watch.
                    </p>
                </div>

                {/* NAVIGATION */}
                <div className="footer-section">
                    <h3 className="footer-title">
                        Navigation
                    </h3>

                    <div className="footer-links">
                        <Link to="/movies">
                            Movies
                        </Link>

                        <Link to="/watchlist">
                            My Watchlist
                        </Link>
                    </div>
                </div>

                {/* ACCOUNT */}
                <div className="footer-section">
                    <h3 className="footer-title">
                        Account
                    </h3>

                    <div className="footer-links">
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </div>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <span>
                        © 2026 MovieList. All rights reserved.
                    </span>

                    <span>
                        Built with React & Express
                    </span>
                </div>
            </div>
        </footer>
    );
}