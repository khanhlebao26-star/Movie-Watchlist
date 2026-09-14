import { prisma } from "../config/db.js";

// GET /watch-progress
// Get all unfinished movies for Continue Watching
export const getContinueWatching = async (req, res, next) => {
    try {
        const progressItems = await prisma.watchProgress.findMany({
            where: {
                userId: req.user.id,
                completed: false,
                positionSeconds: {
                    gt: 0,
                },
            },
            include: {
                movie: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        const movies = progressItems.map((item) => {
            const duration = item.durationSeconds || 0;
            const position = item.positionSeconds || 0;

            const progress = 
                duration > 0
                    ? Math.min((position / duration) * 100, 100)
                    : 0;

            const remainingSeconds = Math.max(
                duration - position, 0
            );

            return {
                progressId: item.id,
                movie: item.movie,
                positionSeconds: position,
                durationSeconds: duration,
                progress: Math.round(progress),
                remainingSeconds,
                remainingMinutes: Math.ceil(
                    remainingSeconds / 60
                ),
                updatedAt: item.updatedAt,
            };
        });

        res.status(200).json({
            status: "success",
            data: {
                movies,
            },
        });
    } catch (error) {
        next(error);
    }
};

// GET /watch-progress/:movieId
// GET progress of one movie
export const getMovieProgress = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        // Check movie exists
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }
        
        const progress = await prisma.watchProgress.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },
        });

        res.status(200).json({
            status: "success",
            data: {
                progress,
            },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /watch-progress/:movieId
// Save progress
export const saveWatchProgress = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const {
            positionSeconds,
            durationSeconds,
        } = req.body || {};

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        const position = Number(positionSeconds);
        const duration = Number(durationSeconds);

        if (!Number.isFinite(position) || position < 0 || !Number.isFinite(duration) || duration <= 0) {
            return res.status(400).json({
                status: "error",
                message: "Invalid video progress",
            });
        }

        const safePosition = Math.min(
            position, duration
        );

        const completed = safePosition >= duration -5;

        const progress = await prisma.watchProgress.upsert({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },

            create: {
                userId: req.user.id,
                movieId,
                positionSeconds: safePosition,
                durationSeconds: duration,
                completed,
            },

            update: {
                positionSeconds: safePosition,
                durationSeconds: duration,
                completed,
            },
        });

        res.status(200).json({
            status: "success",
            data: {
                progress,
            },
        });
    } catch (error) {
        next(error);
    }
};