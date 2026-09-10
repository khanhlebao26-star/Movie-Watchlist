import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthProvider";

import Footer from "./components/Footer";
import { ToastProvider } from "./context/ToastProvider";
import CreateMovie from "./pages/CreateMovie";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import WatchMovie from "./pages/WatchMovie";

import "./App.css";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);

    if (location.pathname !== "/" && location.pathname !== "/movies") {
      navigate("/movies");
    }
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    setPage(1);

    if (location.pathname !== "/" && location.pathname !== "/movies") {
      navigate("/movies");
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setGenre("");
    setPage(1);
  };

  return (
    <div className="app">
      {!isAuthPage && (
        <Navbar
          search={search}
          genre={genre}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
          onClearFilters={handleClearFilters}
        />
      )}

      <Routes>

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/"
                element={
                  <Home
                      search={search}
                      genre={genre}
                      page={page}
                      setPage={setPage}
                  />
                }
              />

              <Route
                path="/movies"
                element={
                    <Movies
                        search={search}
                        genre={genre}
                        page={page}
                        setPage={setPage}
                    />
                }
            />

              <Route
                path="/movies/:id"
                element={<MovieDetail />}
              />

              <Route
                  path="/movies/:id/watch"
                  element={<WatchMovie />}
              />

              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies/new"
                element={
                  <ProtectedRoute>
                    <CreateMovie />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies/:id/edit"
                element={
                  <ProtectedRoute>
                    <CreateMovie />
                  </ProtectedRoute>
                }
              />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}