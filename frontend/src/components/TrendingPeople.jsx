import { useEffect, useState } from "react";
import { trendingApi } from "../services/api";
import PersonCard from "./PersonCard";

export default function TrendingPeople() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);

    const [peoplePerSlide, setPeoplePerSlide] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let nextPeoplePerSlide = 8;

            if(width <= 480) {
                nextPeoplePerSlide = 2;
            } else if (width <= 768) {
                nextPeoplePerSlide = 3;
            } else if (width <= 1100) {
                nextPeoplePerSlide = 4;
            }  else if (width <= 1400) {
                nextPeoplePerSlide = 5;
            }  else if (width <= 1750) {
                nextPeoplePerSlide = 6;
            } 

            setPeoplePerSlide((prev) => {
                if (prev !== nextPeoplePerSlide) {
                    setCurrentSlide(0);
                    return nextPeoplePerSlide;
                }
                return prev;
            });
        };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        let active = true;

        const loadPeople = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await trendingApi.getPeople();

                if (active) {
                    setPeople(result.people || []);
                    setCurrentSlide(0);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.message || 
                        "Failed to load trending people."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadPeople();

        return () => {
            active = false;
        };
    }, []);

    const totalSlide = Math.ceil(
        people.length / peoplePerSlide
    );

    const handlePrevious = () => {
        setCurrentSlide((current) =>
        Math.max(current - 1, 0)
        );   
    };

    const handleNext = () => {
        setCurrentSlide((current) => 
            Math.min(
                current + 1,
                totalSlide -1
            )
        );
    };

    return (
        <section className="trending-people">
            <div className="container">

                {/* HEADER */}
                <div className="trending-people-header">

                    <div>
                        <p className="trending-people-eyebrow">
                            TMDB DISCOVERY
                        </p>

                        <h2 className="trending-people-title">
                            Trending People
                        </h2>
                    </div>

                {/* NAVIGATION */}
                {!loading && !error && totalSlide > 1 && (
                    <div className="trending-people-navigation">

                        <button
                            type="button"
                            className="trending-people-arrow"
                            aria-label="Show previous people"
                            disabled={currentSlide === 0}
                            onClick={handlePrevious}
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            className="trending-people-arrow"
                            aria-label="Show next people"
                            disabled={
                                currentSlide ===
                                totalSlide - 1
                            }
                            onClick={handleNext}
                        >
                            →
                        </button>

                    </div>
                )}
            </div>

                {/* LOADING */}
                {loading && (
                    <div className="loading">
                        Loading trending people...
                    </div>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* PEOPLE */}
                {!loading && !error && people.length > 0 && (
                    <div className="people-carousel">

                        <div
                            className="people-carousel-track"
                            style={{
                                transform: `translateX(-${
                                    currentSlide * 100
                                }%)`,
                            }}
                        >

                            {Array.from({
                                length: totalSlide,
                            }).map((_, index) => {

                                const startIndex = 
                                    index * peoplePerSlide;

                                const slidePeople =
                                    people.slice(
                                        startIndex,
                                        startIndex + peoplePerSlide
                                    );
                                
                                return (
                                    <div
                                        className="people-carousel-slide"
                                        key={index}
                                        style={{
                                            "--people-per-slide": peoplePerSlide,
                                        }}
                                    >
                                        {slidePeople.map((person) => (
                                                <PersonCard
                                                    key={person.id}
                                                    person={person}
                                                />
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                        {!loading &&
                    !error &&
                    people.length === 0 && (
                        <div className="empty-state">
                            No trending people found.
                        </div>
                    )}

            </div>
        </section>
    );
}