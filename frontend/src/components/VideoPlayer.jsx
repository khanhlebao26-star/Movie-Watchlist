import { useEffect, useRef } from "react";

import { useAuth } from "../context/useAuth";
import { watchProgressApi } from "../services/api";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function VideoPlayer({ movieId  }) {
    const videoRef = useRef(null);
    const lastSaveAt = useRef(0);

    const { user } = useAuth();

    // if (!movieId ) {
    //     return (
    //         <div className="video-player-empty">
    //             Video is not available.
    //         </div>
    //     );
    // }

    const videoUrl = movieId
        ? `${API_URL}/api/videos/${encodeURIComponent(movieId)}`
        : "";

    // Load previous progress
    useEffect(() => {
        let active = true;

        const loadProgress = async () => {
            if (!user) {
                return;
            }

            try {
                const result = await watchProgressApi.getMovieProgress(movieId);

                const progress = result.progress;

                if (active && progress && videoRef.current) {
                    videoRef.current.currentTime = progress.positionSeconds;
                }
            } catch (error) {
                console.error(
                    "Failed to load watch progress:",
                    error
                );
            }
        };

        loadProgress();

        return () => {
            active = false;
        };
    }, [movieId, user]);

    // Save progress
    const saveProgress = async (force = false) => {
        const video = videoRef.current;

        if (!user || !video || !movieId) {
            return;
        }

        if (!Number.isFinite(video.duration) || video.duration <= 0) {
            return;
        }

        const now = Date.now();

        // Only save every 5 seconds
        // Unless force = true (pause / ended)
        if (!force && now - lastSaveAt.current < 5000) {
            return;
        }

        lastSaveAt.current = now;
        
        try {
            await watchProgressApi.saveWatchProgress(
                movieId,
                {
                    positionSeconds: video.currentTime,
                    durationSeconds: video.duration,
                }
            );

            console.log("Watch progress saved:", {
                movieId,
                positionSeconds: video.currentTime,
                durationSeconds: video.duration,
            });
        } catch (error) {
            console.error(
                "Failed to save watch progress:",
                error
            );
        }
    };

    if (!movieId) {
        return (
            <div className="video-player-empty">
                Video is not available.
            </div>
        );
    }

    return (
        <div className="video-player">
            <video
                ref={videoRef}
                className="video-player-element"
                controls
                preload="metadata"
                src={videoUrl}
                onTimeUpdate={() => saveProgress(false)}
                onPause={() => saveProgress(true)}
                onEnded={() => saveProgress(true)}
            >
                Your browser does not support video playback.
            </video>
        </div>
    );
}