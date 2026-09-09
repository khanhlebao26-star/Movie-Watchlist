import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

export default function WatchMovie() {
    const { id } = useParams();

    return (
        <main className="watch-page">
            <div className="container">
                <h1 className="watch-title">
                    Watch Movie
                </h1>

                <VideoPlayer movieId={id} />
            </div>
        </main>
    );
}