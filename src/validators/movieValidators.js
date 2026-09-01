import { z } from "zod";

/**
 * Validation schema for creating a new movie
 * Validates title, releaseYear, and optional fields
 */
const createMovieSchema = z.object({
    title: z.string({message: "Movie title must be a string",}).trim().min(1, "Movie title is required"),
    releaseYear: z
        .coerce
        .number({
            message: "Release year must be a number",
        })
        .int({ message: "Release year must be an integer" })
        .min(1888, { message: "Release year must be a valid year" })
        .max(
            new Date().getFullYear() + 10,
            { message: "Release year must be a valid year" }
        ),
    overview: z
        .string({
            message: "Overview must be a string",
        })
        .trim()
        .optional(),
    genres: z
        .array(
            z.string({
                message: "Each genre must be a string",
            }),
            {
                message: "Genres must be an array",
            }
        )
        .optional(),

    runtime: z
        .coerce
        .number({
            message: "Runtime must be a number",
        })
        .int("Runtime must be an integer")
        .positive("Runtime must be a positive number in minutes")
        .optional(),
    posterUrl: z
        .string({
            message: "Poster URL must be a string",
        })
        .url("Poster URL must be a valid URL")
        .optional(),
});

/**
 * Validation schema for updating a movie
 * All fields are optional, but if provided, must meet validation rules
 */
const updateMovieSchema = z.object({
    title: z
        .string({
            message: "Movie title must be a string",
        })
        .trim()
        .min(1, "Movie title cannot be empty")
        .optional(),
    releaseYear: z
        .coerce
        .number({
            message: "Release year must be a number",
        })
        .int("Release year must be an integer")
        .min(1888, "Release year must be a valid year")
        .max(
            new Date().getFullYear() + 10,
            "Release year must be a valid year"
        )
        .optional(),
    overview: z
        .string({
            message: "Overview must be a string",
        })
        .trim()
        .optional(),
    genres: z
        .array(
            z.string({
                message: "Each genre must be a string",
            }),
            {
                message: "Genres must be an array",
            }
        )
        .optional(),
    runtime: z
        .coerce
        .number({
            message: "Runtime must be a number",
        })
        .int("Runtime must be an integer")
        .positive("Runtime must be a positive number in minutes")
        .optional(),
    posterUrl: z
        .string({
            message: "Poster URL must be a string",
        })
        .url("Poster URL must be a valid URL")
        .optional(),
});

export { createMovieSchema, updateMovieSchema };
