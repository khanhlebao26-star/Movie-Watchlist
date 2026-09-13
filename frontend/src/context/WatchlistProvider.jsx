import { useEffect, useState } from "react";

import { watchlistApi } from "../services/api";
import { useAuth } from "./useAuth";
import { WatchlistContext } from "./WatchlistContext";

export function WatchlistProvider({ children }) {
    const { user, loading: authLoading } = useAuth();

    const [watchlistMovieIds, setWatchlistMovieIds] = useState(
        new Set()
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;

        const loadWatchlist = async () => {
            if (authLoading) {
                return;
            }
            if (!user) {
                setWatchlistMovieIds(new Set());
                return;
            }

            try {
                setLoading(true);
                
                const result = await watchlistApi.getWatchlist();

                if (!active) {
                    return;
                }

                const movieIds = new Set(
                    (result.items || []).map(
                        (item) => item.movieId
                    )
                );

                setWatchlistMovieIds(movieIds);
            } catch (error) {
                if (active) {
                    setWatchlistMovieIds(new Set());
                    console.error(
                        "Failed to load watchlist:",
                        error
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadWatchlist();

        return () => {
            active = false;
        };
    }, [user, authLoading]);

    const isMovieInWatchlist = (movieId) => {
        return watchlistMovieIds.has(movieId);
    };

    const addMovieToWatchlist = (movieId) => {
        setWatchlistMovieIds((currentIds) => {
            const nextIds = new Set(currentIds);
            nextIds.add(movieId);
            return nextIds;
        });
    };

    const removeMovieFromWatchlist = (movieId) => {
        setWatchlistMovieIds((currentIds) => {
            const nextIds = new Set(currentIds);
            nextIds.delete(movieId);
            return nextIds;
        });
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlistMovieIds,
                loading,
                isMovieInWatchlist,
                addMovieToWatchlist,
                removeMovieFromWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}