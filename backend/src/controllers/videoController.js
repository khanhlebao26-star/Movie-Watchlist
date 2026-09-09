import "dotenv/config";
import { prisma } from "../config/db.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const BUCKET_NAME = "movies";

export const streamVideo = async (req, res) => {
    try {
        const movieId = req.params.movieId;

        // Tìm movie trong database
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        //Không tìm thấy movie
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        // Movie chưa có video
        if(!movie.videoPath) {
            return res.status(404).json({
                message: "Video is not available for this movie",
            });
        }

        // Lấy filename từ database
        const filename = movie.videoPath;

        // Tạo URL Supabase Storage
        const videoUrl =
            `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${encodeURIComponent(filename)}`;
        
        // Lấy Range từ Browser
        const range = req.headers.range;

        // Header gửi tới Supabase
        const headers = {};

        if (range) {
            headers.Range = range;
        }

        // Request tới Supabase Storage
        const response = await fetch(videoUrl, {
            headers,
        });

        // Video không tồn tại
        if (response.status === 404) {
            return res.status(404).json({
                message: "Video not found in storage",
            });
        }

        // Lỗi từ Supabase
        if (!response.ok) {
            return res.status(response.status).send(
                "Failed to fetch video from storage"
            );
        }

        // Giữ nguyên status của Supabase
        res.status(response.status);

        // Content-Type
        if (response.headers.get("content-type")) {
            res.setHeader(
                "Content-Type",
                response.headers.get("content-type")
            );
        }

        // Content-Length
        if (response.headers.get("content-length")) {
            res.setHeader(
                "Content-Length",
                response.headers.get("content-length")
            );
        }

        // Content-Range
        if (response.headers.get("content-range")) {
            res.setHeader(
                "Content-Range",
                response.headers.get("content-range")
            );
        }

        // Browser biết server hỗ trợ Range
        res.setHeader("Accept-Ranges", "bytes");

        // Stream:
        // Supabase → Express → Browser
        if (response.body) {
            for await (const chunk of response.body) {
                res.write(chunk);
            }

            res.end();
        }

    } catch (error) {
        console.error("Video streaming error:", error);

        if (!res.headersSent) {
            res.status(500).json({
                message: "Failed to stream video",
            });
        }
    }
};