import express from "express";

// Import Routes
import movieRoutes from './routes/movieRoutes.js';

const app = express();

// API Routes
app.use("/movies", movieRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

// GET, POST, PUT, DELETE
// http://localhost:5001/

// AUTH: signin, signup
// MOVIE: GETTING ALL MOVIES
// USER: Profile
// WATCHLIST