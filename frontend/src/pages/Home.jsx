import ContinueWatching from "../components/ContinueWatching";
import HomeHero from "../components/HomeHero";
import HomeMovies from "../components/HomeMovies";
import Newsletter from "../components/Newsletter";
import TrendingPeople from "../components/TrendingPeople";
import UpcomingReleases from "../components/UpcomingReleases";

export default function Home({ search, genre }) {
    return (
        <>
            <HomeHero />

            <HomeMovies
                search={search}
                genre={genre}
            />

            <ContinueWatching />

            <TrendingPeople />

            <UpcomingReleases />

            <Newsletter />
        </>
    );
}