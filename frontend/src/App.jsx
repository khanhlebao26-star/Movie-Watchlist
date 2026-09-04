import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
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
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";

import "./App.css";

function AppLayout() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="app">
      {!isAuthPage && <Navbar />}

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
                element={<Home />}
              />

              <Route
                path="/movies"
                element={<Home />}
              />

              <Route
                path="/movies/:id"
                element={<MovieDetail />}
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