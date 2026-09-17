import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ children, adminOnly = false }) {

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // Chưa đăng nhập
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Đã đăng nhập nhưng không phải Admin
    if (adminOnly && user.role !== "ADMIN") {
        return <Navigate to="/movies" replace/>;
    }

    return children;
}