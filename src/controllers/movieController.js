import { prisma } from "../config/db.js";

// GET /movies
const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });

    res.status(200).json({
        status: "success",
        data: {
            movies,
        },
    });
};

// GET /movies/:id
const getMovieById = async (req, res) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });
};


// POST /movies
const createMovie = async (req, res) => {
    const { title, overview, releaseYear, genres, runtime, posterUrl,} = req.body;

    const movie = await prisma.movie.create({
        data: {
            title, 
            overview,
            releaseYear, 
            genres, 
            runtime,
            posterUrl,
            createdBy: req.user.id,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            movie,
        },
    });
};

// PUT /movies/:id
const updateMovie = async (req, res) => {
    const {
        title,
        overview,
        releaseYear,
        genres,
        runtime,
        posterUrl,
    } = req.body;

    const movie = await prisma.movie.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found",
        });
    }

    if (movie.createdBy !== req.user.id) {
    return res.status(403).json({
        error: "Not allowed to modify this movie",
    });
}

    const updatedMovie = await prisma.movie.update({
        where: {
            id: req.params.id,
        },
        data: {
            title,
            overview,
            releaseYear,
            genres,
            runtime,
            posterUrl,
        },
    });

    res.status(200).json({
        status: "success",
        data: {
            movie: updatedMovie,
        },
    });
};

// DELETE /movies/:id
const deleteMovie = async (req, res) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found",
        });
    }

    // 2. Check if the user is an owner
    if (movie.createdBy !== req.user.id) {
        return res.status(403).json({
            error: "Not allowed to modify this movie",
        });
    }

    await prisma.movie.delete({
        where: {
            id: req.params.id,
        },
    });

    res.status(200).json({
        status: "success",
        message: "Movie deleted successfully",
    });
};


export {
    createMovie, deleteMovie, getMovieById, getMovies, updateMovie
};
