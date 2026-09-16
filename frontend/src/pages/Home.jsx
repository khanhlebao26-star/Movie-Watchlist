import ContinueWatching from "../components/ContinueWatching";
import FeaturedGenres from "../components/FeaturedGenres";
import HomeHero from "../components/HomeHero";
import HomeMovies from "../components/HomeMovies";
import TrendingPeople from "../components/TrendingPeople";
import UpcomingReleases from "../components/UpcomingReleases";
import WeeklyRanking from "../components/WeeklyRanking";

export default function Home({ search, genre }) {
    return (
        <>
            <HomeHero />

            <WeeklyRanking />

            <ContinueWatching />

            <FeaturedGenres />

            <HomeMovies
                search={search}
                genre={genre}
            />

            <TrendingPeople />

            <UpcomingReleases/>
        </>
    );
}