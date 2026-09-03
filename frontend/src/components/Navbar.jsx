import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">

                {/* Logo */}
                <Link to="/" className="logo">
                    Movie<span className="logo-accent">List</span>
                </Link>


                {/* Navigation */}
                <nav className="nav-links">

                    <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                        }
                    >
                        Movies
                    </NavLink>

                    {user && (
                        <NavLink
                            to="/watchlist"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            My Watchlist
                        </NavLink>
                    )}

                    {user && (
                        <NavLink
                            to="/movies/new"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            Add Movie
                        </NavLink>
                    )}

                </nav>


                {/* User section */}
                <div className="nav-user">

                    {user ? (
                        <>
                            <span className="nav-user-name">
                                Hi, {user.name}
                            </span>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn btn-ghost"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-primary"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
}