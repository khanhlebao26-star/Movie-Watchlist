export default function PersonCard({ person }) {
    return (
        <article className="person-card">
            <div className="person-card-image-wrapper">
                <img
                    className="person-card-image"
                    src={person.imageUrl}
                    alt={person.name}
                    loading="lazy"
                />

            </div>

            <p className="person-card-rank">
                #{person.rank}
            </p>

            <h3 className="person-card-name">
                {person.name}
            </h3>
        </article>
    );
}