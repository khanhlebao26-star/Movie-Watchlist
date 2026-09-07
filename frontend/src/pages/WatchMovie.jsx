import VideoPlayer from "../components/VideoPlayer";

export default function WatchMovie() {
    // const { id } = useParams();

    return (
        <main className="watch-page">
            <div className="container">
                {/* <Link to={`/movies/${id}`} className="watch-back">
                    ← Back to Movie Details
                </Link> */}

                <h1 className="watch-title">
                    Watch Movie
                </h1>

                <VideoPlayer filename="test-movie.mp4" />
            </div>
        </main>
    );
}