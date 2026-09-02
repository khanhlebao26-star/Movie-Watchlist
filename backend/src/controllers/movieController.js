import { prisma } from "../config/db.js";

// GET /movies
const getMovies = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, genre } = req.query;
        
        const skip = (page - 1) * limit;
        
        // Build filter
        const where = {};
        if (search) {
            where.title = { contains: search, mode: "insensitive" };
        }
        if (genre) {
            where.genres = { has: genre };
        }
        
        const movies = await prisma.movie.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: parseInt(skip),
            take: parseInt(limit),
        });
        
        // Get total count
        const total = await prisma.movie.count({ where });
        
        res.status(200).json({
            status: "success",
            data: {
                movies,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

// GET /movies/:id
const getMovieById = async (req, res, next) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: { movie },
        });
    } catch (err) {
        next(err);
    }
};

// POST /movies
const createMovie = async (req, res, next) => {
    try {
        const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

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
            data: { movie },
        });
    } catch (err) {
        next(err);
    }
};

// PUT /movies/:id
const updateMovie = async (req, res, next) => {
    try {
        const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        if (movie.createdBy !== req.user.id) {
            return res.status(403).json({
                status: "error",
                message: "Not allowed to modify this movie",
            });
        }

        // Build update data only with provided fields
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (overview !== undefined) updateData.overview = overview;
        if (releaseYear !== undefined) updateData.releaseYear = releaseYear;
        if (genres !== undefined) updateData.genres = genres;
        if (runtime !== undefined) updateData.runtime = runtime;
        if (posterUrl !== undefined) updateData.posterUrl = posterUrl;

        const updatedMovie = await prisma.movie.update({
            where: { id: req.params.id },
            data: updateData,
        });

        res.status(200).json({
            status: "success",
            data: { movie: updatedMovie },
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /movies/:id
const deleteMovie = async (req, res, next) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        if (movie.createdBy !== req.user.id) {
            return res.status(403).json({
                status: "error",
                message: "Not allowed to delete this movie",
            });
        }

        await prisma.movie.delete({
            where: { id: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Movie deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

export {
    createMovie, deleteMovie, getMovieById, getMovies, updateMovie
};
