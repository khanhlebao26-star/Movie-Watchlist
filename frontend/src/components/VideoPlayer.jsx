
const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function VideoPlayer({ movieId  }) {
    if (!movieId ) {
        return (
            <div className="video-player-empty">
                Video is not available.
            </div>
        );
    }

    const videoUrl = 
        `${API_URL}/api/videos/${encodeURIComponent(movieId)}`;

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