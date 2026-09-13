import { Link } from "react-router-dom";

const weeklyMovies = [
    {
        rank: 1,
        id: "0a20e8f1-aeca-4c94-b50e-5789e344b183",
        title: "Spider-Man 3",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BODE2NzNhMDctYjUzMC00Y2M5LWI2Y2EtODJkZTFjN2Y5ODlmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        rank: 2,
        id: "1c59f0e6-7a52-48cf-b8c8-329924bf16af",
        title: "The Amazing Spider-Man 2",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_.jpg",
    },
    {
        rank: 3,
        id: "2957957c-2add-4de0-9fd5-f4129fcd13b9",
        title: "Spider-Man 2",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BNGQ0YTQyYTgtNWI2YS00NTE2LWJmNDItNTFlMTUwNmFlZTM0XkEyXkFqcGc@._V1_.jpg",
    },
    {
        rank: 4,
        id: "2d8da720-43ba-49b1-af67-bb3308f75003",
        title: "Spider-Man",
        posterUrl: "https://i.ebayimg.com/images/g/QmMAAOSwGltarTEJ/s-l1200.jpg",
    },
    {
        rank: 5,
        id: "e588884e-2f65-4e14-b6fb-4712794a25cb",
        title: "Spider-Man: Far From Home",
        posterUrl: "https://resizing.flixster.com/Fc1FZrej9A-GYxYP3boYzqIQ9Tk=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzRmYzI5Yzc5LWI1NDUtNDk5OC1hNjBkLTRlNGNhZTRjNWE4OS53ZWJw",
    },
];

export default function WeeklyRanking() {
    return (
        <section className="Weekly-ranking">
            <div className="container">

                <div className="weekly-ranking-header">
                    <span className="weekly-ranking-label">
                        WEEKLY RANKING
                    </span>

                    <h2 className="weekly-ranking-title">
                        Top 5 This Week
                    </h2>

                    <p className="weekly-ranking-description">
                        The most popular movies this week.
                    </p>
                </div>

                <div className="weekly-ranking-list">
                    {weeklyMovies.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movies/${movie.id}`}
                            className="weekly-ranking-item"
                        >
                            <span className="weekly-ranking-number">
                                {movie.rank}
                            </span>

                            <div className="weekly-ranking-poster-wrapper">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="weekly-ranking-poster"
                                />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}