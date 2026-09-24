import "dotenv/config";

const TMDB_URL = "https://api.themoviedb.org/3";

const blockedPersonIds = new Set(
    (process.env.BLOCKED_TMDB_PERSON_IDS || "")
        .split(",")
        .map(Number)
        .filter(Number.isInteger)
);

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
            // Chỉ chấp nhận person được TMDB xác định là không adult
            .filter((person) => person.adult === false)
            // Chỉ lấy những người có department là Acting
            .filter((person) => person.known_for_department === "Acting")
            // Loại những person nằm trong blocklist
            .filter((person) => !blockedPersonIds.has(person.id))
            // Phải có ảnh
            .filter((person) => person.profile_path)
            // Chỉ lấy tối đa 12 người
            .slice(0, 12)
            .map((person, index) => ({
                id: person.id,
                name: person.name,
                rank: index + 1,
                imageUrl: `https://image.tmdb.org/t/p/w342${person.profile_path}`,
                popularity: person.popularity,
            }));

        res.setHeader(
            "Cache-Control",
            "public, max-age=600"
        );

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