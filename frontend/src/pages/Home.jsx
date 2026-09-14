import ContinueWatching from "../components/ContinueWatching";
import HomeHero from "../components/HomeHero";
import HomeMovies from "../components/HomeMovies";
import TrendingPeople from "../components/TrendingPeople";
import WeeklyRanking from "../components/WeeklyRanking";

export default function Home({ search, genre }) {
    return (
        <>
            <HomeHero />

            <WeeklyRanking />

            <ContinueWatching />

            <HomeMovies
                search={search}
                genre={genre}
            />

            <TrendingPeople />
        </>
    );
}