import { prisma } from "../config/db.js";
import { movieQuerySchema } from "../validators/movieValidators.js";

// GET /movies
const getMovies = async (req, res, next) => {
    try {
        const {
            page,
            limit,
            search,
            genre,
        } = movieQuerySchema.parse(req.query);

        const skip = (page - 1) * limit;
        
        // Build filter
        const where = {};
        
        if (search) {
            where.title = { 
                contains: search, 
                mode: "insensitive" 
            };
        }
        if (genre) {
            where.genres = { 
                has: genre 
            };
        }
        
        const movies = await prisma.movie.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });
        
        // Get total count
        const total = await prisma.movie.count({ where });
        
        res.status(200).json({
            status: "success",
            data: {
                movies,
                pagination: {
                    page,
                    limit,
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
        const { title, overview, releaseYear, genres, runtime, posterUrl, videoPath } = req.body;

        const movie = await prisma.movie.create({
            data: {
                title,
                overview,
                releaseYear,
                genres,
                runtime,
                posterUrl,
                videoPath,
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
        const { title, overview, releaseYear, genres, runtime, posterUrl, videoPath } = req.body;

        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        // if (movie.createdBy !== req.user.id) {
        //     return res.status(403).json({
        //         status: "error",
        //         message: "Not allowed to modify this movie",
        //     });
        // }

        // Build update data only with provided fields
        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (overview !== undefined) updateData.overview = overview;
        if (releaseYear !== undefined) updateData.releaseYear = releaseYear;
        if (genres !== undefined) updateData.genres = genres;
        if (runtime !== undefined) updateData.runtime = runtime;
        if (posterUrl !== undefined) updateData.posterUrl = posterUrl;
        if (videoPath !== undefined) updateData.videoPath = videoPath;
            
        // Nếu title hoặc releaseYear thay đổi,
        // tmdbId cũ có thể không còn đúng.
        const movieIdentityChanged =
            (title !== undefined && title !== movie.title) ||
            (releaseYear !== undefined && releaseYear !== movie.releaseYear);

        if (movieIdentityChanged) {
            updateData.tmdbId = null;
        }

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

        // if (movie.createdBy !== req.user.id) {
        //     return res.status(403).json({
        //         status: "error",
        //         message: "Not allowed to delete this movie",
        //     });
        // }

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

const getMovieCast = async (req, res, next) => {
    try {
        // 1. Lấy movie từ database local
        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        // 2. Header để gọi TMDB
        const headers = {
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
            Accept: "application/json",
        };

        // 3. Ưu tiên tmdbId đã lưu trong database
        let tmdbId = movie.tmdbId;

        // 4. Nếu chưa có tmdbId thì tìm bằng title + releaseYear
        if (!tmdbId) {
            const searchUrl =
                `https://api.themoviedb.org/3/search/movie` +
                `?query=${encodeURIComponent(movie.title)}` +
                `&year=${movie.releaseYear}`;

            const searchResponse = await fetch(searchUrl, {
                headers,
            });

            if (!searchResponse.ok) {
                throw new Error("Failed to search movie on TMDB");
            }

            const searchData = await searchResponse.json();

            if (!searchData.results?.length) {
                return res.status(404).json({
                    status: "error",
                    message: "Movie not found on TMDB",
                });
            }

            tmdbId = searchData.results[0].id;

            // Lưu TMDB ID vào database
            await prisma.movie.update({
                where: { id: movie.id },
                data: { tmdbId },
            });
        }

        // 5. Lấy cast trực tiếp bằng tmdbId
        const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}/credits`,
            {
                headers,
            }
        );

        if (!creditsResponse.ok) {
            throw new Error("Failed to fetch movie cast from TMDB");
        }

        const creditsData = await creditsResponse.json();

        // 6. Cache HTTP trong 1 giờ
        res.setHeader(
            "Cache-Control",
            "public, max-age=3600"
        );

        // 7. Trả dữ liệu về frontend
        res.status(200).json({
            status: "success",
            data: {
                tmdbMovieId: tmdbId,
                cast: creditsData.cast.slice(0, 10),
            },
        });

    } catch (err) {
        next(err);
    }
};

export {
    createMovie,
    deleteMovie,
    getMovieById,
    getMovieCast,
    getMovies,
    updateMovie
};

