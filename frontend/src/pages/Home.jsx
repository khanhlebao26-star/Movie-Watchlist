import HomeHero from "../components/HomeHero";
import HomeMovies from "../components/HomeMovies";
import TrendingPeople from "../components/TrendingPeople";

export default function Home({ search, genre }) {
    return (
        <main className="home-page">

            <HomeHero />

            <TrendingPeople />

            <HomeMovies
                search={search}
                genre={genre}
            />

        </main>
    );
}