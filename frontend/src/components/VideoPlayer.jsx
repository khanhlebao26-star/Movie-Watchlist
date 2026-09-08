import { videoApi } from "../services/api";

// const API_URL =
//     import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function VideoPlayer({ filename }) {
    if (!filename) {
        return (
            <div className="video-player-empty">
                Video is not available.
            </div>
        );
    }

    const videoUrl = videoApi.getVideoUrl(filename);

    return (
        <div className="video-player">
            <video
                className="video-player-element"
                controls
                preload="metadata"
                src={videoUrl}
            >
                Your browser does not support video playback.
            </video>
        </div>
    );
}