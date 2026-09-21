import { useEffect, useRef, useState } from "react";

import { useAuth } from "../context/useAuth";
import { videoApi, watchProgressApi } from "../services/api";

// const API_URL =
//     import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function VideoPlayer({ movieId  }) {
    const videoRef = useRef(null);
    const lastSaveAt = useRef(0);

    const { user } = useAuth();

    const [videoUrl, setVideoUrl] = useState("");
    const [videoLoading, setVideoLoading] = useState(true);
    const [videoError, setVideoError] = useState("");
    const resumeAt = useRef(0);

    useEffect(() => {
        let active = true;

        const loadVideo = async () => {
            if (!user || !movieId) {
                setVideoLoading(false);
                setVideoUrl("");
                return;
            }

            try {

                setVideoLoading(true);
                setVideoError("");
                setVideoUrl("");

                const [videoResult, progressResult] =
                    await Promise.all([
                        videoApi.getVideoUrl(movieId),
                        watchProgressApi
                            .getMovieProgress(movieId)
                            .catch((error) => {
                                console.log(
                                    "Failed to load watch progress:",
                                    error
                                );

                                return {
                                    progress: null,
                                };
                            }),
                    ]);

                if (!active) {
                    return;
                }

                resumeAt.current =
                    progressResult.progress
                        ?.positionSeconds || 0;
                
                        setVideoUrl(videoResult.url);

            } catch (error) {
                if (active) {
                    setVideoError(
                        error.message || "Failed to load video."
                    );
                }
            } finally {
                if (active) {
                    setVideoLoading(false);
                }
            }
        };
        
        loadVideo();

        return () => {
            active = false;
        };
    }, [movieId, user]);

    const handleLoadedMetadata = () => {
        const video = videoRef.current;

        if (
            video &&
            resumeAt.current > 0 &&
            resumeAt.current < video.duration
        ) {
            video.currentTime = resumeAt.current;
        }
    };

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

    if (videoLoading) {
        return (
            <div className="video-player-empty">
                Loading video...
            </div>
        );
    }

    if (videoError || !videoUrl) {
        return (
            <div className="video-player-empty">
                {videoError || "video is not available"}
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
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() => saveProgress(false)}
                onPause={() => saveProgress(true)}
                onEnded={() => saveProgress(true)}
            >
                Your browser does not support video playback.
            </video>
        </div>
    );
}