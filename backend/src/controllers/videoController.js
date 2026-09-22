import { prisma } from "../config/db.js";
import { supabaseAdmin, supabaseBucket } from "../config/supabase.js";

const SIGNED_URL_TTL_SECONDS = 4 * 60 * 60;

export const getVideoUrl = async (req, res, next) => {
    try {

        // Tìm movie trong database
        const movie = await prisma.movie.findUnique({
            where: {
                id: req.params.movieId,
            },
            select: {
                videoPath: true,
            },
        });

        //Không tìm thấy movie
        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
        }

        // Movie chưa có video
        if(!movie.videoPath) {
            return res.status(404).json({
                status: "error",
                message: "Video is not available for this movie",
            });
        }

        const {data, error} = await supabaseAdmin.storage
            .from(supabaseBucket)
            .createSignedUrl(
                movie.videoPath,
                SIGNED_URL_TTL_SECONDS
            );

        if (error || !data?.signedUrl) {
            const storageError = new Error(
                "Failed to create video URL"
            );
            storageError.statusCode = 502;
            throw storageError;
        }

        res.status(200).json({
            status: "success",
            data: {
                url: data.signedUrl,
                expiresIn: SIGNED_URL_TTL_SECONDS,
            },
        });

    } catch (error) {
        next(error);
    }
};