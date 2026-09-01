import { z } from "zod";

const STATUS_VALUES = [
    "PLANNED",
    "WATCHING",
    "COMPLETED",
    "DROPPED",
];

/**
 * Add movie to watchlist
 */
const addToWatchlistSchema = z.object({
    movieId: z
        .string()
        .uuid("Movie ID must be a valid UUID"),

    status: z
        .enum(STATUS_VALUES, {
            message:
                "Status must be one of PLANNED, WATCHING, COMPLETED, DROPPED",
        })
        .optional(),

    rating: z
        .coerce
        .number({
            message: "Rating must be a number",
        })
        .int("Rating must be an integer")
        .min(1, "Rating must be between 1 and 10")
        .max(10, "Rating must be between 1 and 10")
        .optional(),

    notes: z
        .string({
            message: "Notes must be a string",
        })
        .optional(),
});

/**
 * Update watchlist item
 */
const updateWatchlistItemSchema = z.object({
    status: z
        .enum(STATUS_VALUES, {
            message:
                "Status must be one of PLANNED, WATCHING, COMPLETED, DROPPED",
        })
        .optional(),

    rating: z
        .coerce
        .number({
            message: "Rating must be a number",
        })
        .int("Rating must be an integer")
        .min(1, "Rating must be between 1 and 10")
        .max(10, "Rating must be between 1 and 10")
        .optional(),

    notes: z
        .string({
            message: "Notes must be a string",
        })
        .optional(),
});

export {
    addToWatchlistSchema,
    updateWatchlistItemSchema
};
