const genres = [
    {
        name: "Action",
        count: "1,240 movies",
        icon: "♨",
    },
    {
        name: "Science Fiction",
        count: "860 movies",
        icon: "✧",
    },
    {
        name: "Romance",
        count: "990 movies",
        icon: "🎟",
    },
    {
        name: "Comedy",
        count: "540 movies",
        icon: "🎬",
    },
    {
        name: "Animation",
        count: "710 movies",
        icon: "▷",
    },
    {
        name: "Drama",
        count: "1,520 movies",
        icon: "↗",
    },
];

export default function FeaturedGenres() {
    return (
        <section className="featured-genres">
            <div className="container">

                <div className="featured-genres-header">
                    <span className="featured-genres-label">
                        QUICK PICKS
                    </span>

                    <h2 className="featured-genres-title">
                        Featured Genres
                    </h2>

                    <p className="featured-genres-description">
                        Choose your mood, we’ll handle the rest.
                    </p>
                </div>

                <div className="featured-genres-grid">
                    {genres.map((genre) => (
                        <div
                            key={genre.name}
                            className="featured-genre-card"
                        >
                            <span className="featured-genre-icon">
                                {genre.icon}
                            </span>

                            <div className="featured-genre-content">
                                <h3 className="featured-genre-name">
                                    {genre.name}
                                </h3>

                                <p className="featured-genre-count">
                                    {genre.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}