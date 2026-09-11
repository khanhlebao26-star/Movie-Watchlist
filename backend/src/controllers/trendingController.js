import "dotenv/config";

const TMDB_URL = "https://api.themoviedb.org/3";

export const getTrendingPeople = async (req, res, next) => {
    try {
        const token = process.env.TMDB_READ_ACCESS_TOKEN;

        if (!token) {
            const error = new Error("TMDB token is missing");
            error.statusCode = 500;
            throw error;
        }

        const response = await fetch(
            `${TMDB_URL}/trending/person/week`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(
                data.status_message || "Failed to fetch trending people"
            );

            error.statusCode = response.status;
            throw error;
        }

        const people = data.results
            .filter((person) => person.profile_path)
            .map((person, index) => ({
                id: person.id,
                name: person.name,
                rank: index + 1,
                imageUrl: `https://image.tmdb.org/t/p/w342${person.profile_path}`,
                popularity: person.popularity,
            }));

        res.status(200).json({
            status: "success",
            data: {
                people,
            },
        });
    } catch (error) {
        next(error);
    }
};