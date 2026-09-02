import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Something went wrong";

        return Promise.reject(new Error(message));
    }
);

export const authApi = {

    register: async (payload) => {
        const res = await api.post("/auth/register", payload);
        return res.data;
    },

    login: async (payload) => {
        const res = await api.post("/auth/login", payload);
        return res.data;
    },

    logout: async () => {
        const res = await api.post("/auth/logout");
        return res.data;
    },

    me: async () => {
        const res = await api.get("/auth/me");
        return res.data;
    },
};

export const movieApi = {

    getMovies: async (params = {}) => {
        const res = await api.get("/movies", {
            params,
        });

        return res.data;
    },

    getMovieById: async (id) => {
        const res = await api.get(`/movies/${id}`);

        return res.data;
    },

    createMovie: async (payload) => {
        const res = await api.post("/movies", payload);

        return res.data;
    },

    updateMovie: async (id, payload) => {
        const res = await api.put(
            `/movies/${id}`,
            payload
        );

        return res.data;
    },

    deleteMovie: async (id) => {
        const res = await api.delete(
            `/movies/${id}`
        );

        return res.data;
    },
};

export const watchlistApi = {

    getWatchlist: async () => {
        const res = await api.get("/watchlist");

        return res.data;
    },

    addToWatchlist: async (payload) => {
        const res = await api.post(
            "/watchlist",
            payload
        );

        return res.data;
    },

    updateWatchlistItem: async (id, payload) => {
        const res = await api.put(
            `/watchlist/${id}`,
            payload
        );

        return res.data;
    },

    removeFromWatchlist: async (id) => {
        const res = await api.delete(
            `/watchlist/${id}`
        );

        return res.data;
    },
};

export default api;