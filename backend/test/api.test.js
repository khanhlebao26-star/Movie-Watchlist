import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test, { after, mock } from "node:test";
import request from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/config/db.js";
import {
    supabaseAdmin,
} from "../src/config/supabase.js";

import bcrypt from "bcryptjs";

const createdUserIds = [];
const createdMovieIds = [];

const createTestUser = () => {
    return {
        name: "Test User",
        email: `test-${randomUUID()}@example.com`,
        password: "TestPassword123!",
    };
};

const createAdminUser = () => ({
    name: "Test Admin",
    email: `admin-${randomUUID()}@example.com`,
    password: "AdminPassword123!",
});

const registerAndLogin = async (userData) => {
    const registerResponse = await request(app)
        .post("/auth/register")
        .send(userData);

        assert.equal(registerResponse.status, 201);
        
    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: userData.email,
            password: userData.password,
        });

    assert.equal(loginResponse.status, 200);

    return loginResponse.headers["set-cookie"];
};

const createTestAdmin = async () => {
    const admin = await prisma.user.create({
        data: {
            name: "Test Admin",
            email: `admin-${randomUUID()}@example.com`,
            password: await bcrypt.hash("AdminPassword123!", 10),
            role: "ADMIN",
        },
    });

    createdUserIds.push(admin.id);

    return {
        ...admin,
        plainPassword: "AdminPassword123!",
    };
};

const createTestMovie = async () => {
    const user = await prisma.user.create({
        data: {
            name: "Movie Creator",
            email: `movie-creator-${randomUUID()}@example.com`,
            password: "hashed-password",
            role: "USER",
        },
    });

    createdUserIds.push(user.id);

    const movie = await prisma.movie.create({
        data: {
            title: `Test Movie ${randomUUID()}`,
            overview: "Movie created for integration testing",
            releaseYear: 2026,
            genres: ["Drama", "Test"],
            runtime: 120,
            createdBy: user.id,
        },
    });

    createdMovieIds.push(movie.id);

    return movie;
}

// Authentication tests
test("GET /movies returns 200", async () => {
    const response = await request(app)
        .get("/movies");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
});

test("POST /auth/register creates a USER account", async () => {
    const user = createTestUser();

    const response = await request(app)
        .post("/auth/register")
        .send(user);

    assert.equal(response.status, 201);
    assert.equal(response.body.status, "success");

    assert.ok(response.body.data.user);

    assert.equal(response.body.data.user.name, user.name);
    assert.equal(response.body.data.user.email, user.email);
    assert.equal(response.body.data.user.role, "USER");

    // Password must never be returned
    assert.equal(response.body.data.user.password, undefined);

    createdUserIds.push(response.body.data.user.id);

    // JWT cookie should be created
    assert.ok(response.headers["set-cookie"]);
});

test("POST /auth/register rejects duplicate email", async () => {
    const user = createTestUser();

    const firstResponse = await request(app)
        .post("/auth/register")
        .send(user);

    assert.equal(firstResponse.status, 201);
    
    createdUserIds.push(firstResponse.body.data.user.id);

    const secondResponse = await request(app)
        .post("/auth/register")
        .send(user);

    assert.equal(secondResponse.status, 400);
    assert.equal(secondResponse.body.status, "error");
    assert.equal(
        secondResponse.body.message,
        "User already exists with this email"
    );
});

test("POST /auth/login logs in with valid credentials", async () => {
    const user = createTestUser();

    const registerResponse = await request(app)
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);
    
    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await request(app)
        .post("/auth/login")
        .send({
            email: user.email,
            password: user.password,
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    assert.equal(response.body.data.user.email, user.email);
    assert.equal(response.body.data.user.role, "USER");
    assert.equal(response.body.data.user.password, undefined);

    // JWT cookie should exist
    assert.ok(response.headers["set-cookie"]);
});

test("POST /auth/login rejects invalid password", async () => {
    const user = createTestUser();

    const registerResponse = await request(app)
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);
    
    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await request(app)
        .post("/auth/login")
        .send({
            email: user.email,
            password: "WrongPassword123!",
        });

    assert.equal(response.status, 401);
    assert.equal(response.body.status, "error");
    assert.equal(response.body.message, "Invalid email or password");

});

test("POST /auth/login rejects unknown email", async () => {
    const user = createTestUser();

    const response = await request(app)
        .post("/auth/login")
        .send({
            email: user.email,
            password: user.password,
        });

    assert.equal(response.status, 401);
    assert.equal(response.body.status, "error");
    assert.equal(response.body.message, "Invalid email or password");

});

test("GET /auth/me requires authentication", async () => {
    const response = await request(app)
        .get("/auth/me");

    assert.equal(response.status, 401);
    assert.equal(response.body.error,
        "Not authorized, no token provided"
    );
});

test("GET /auth/me returns logged-in user", async () => {
    const user = createTestUser();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .get("/auth/me");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const returnedUser = response.body.data.user;

    assert.equal(returnedUser.id, registerResponse.body.data.user.id);
    assert.equal(returnedUser.name, user.name);
    assert.equal(returnedUser.email, user.email);
    assert.equal(returnedUser.role, "USER");

    // Password must never appear
    assert.equal(returnedUser.password, undefined);
});

test("POST /auth/logout clears authentication cookie", async () => {
    const user = createTestUser();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    // Confirm authenticated first
    const meBeforeLogout = await agent
        .get("/auth/me");

    assert.equal(meBeforeLogout.status, 200);

    // Logout
    const logoutResponse = await agent
        .post("/auth/logout");

    assert.equal(logoutResponse.status, 200);
    assert.equal(logoutResponse.body.status, "success");
    assert.equal(
        logoutResponse.body.message,
        "Logged out successfully"
    );

    // Cookie should no longer authenticate the user
    const meAfterLogout = await agent
        .get("/auth/me");

    assert.equal(meAfterLogout.status, 401);
});

// Watchlist tests
test("GET /watchlist requires authentication", async () => {
    const response = await request(app)
        .get("/watchlist");

    assert.equal(response.status, 401);
});

test("POST /watchlist adds a movie", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
            status: "PLANNED",
            rating: 8,
            notes: "Test movie",
        });

    assert.equal(response.status, 201);
    assert.equal(response.body.status, "success");

    const item = response.body.data.watchListItem;

    assert.equal(item.userId, registerResponse.body.data.user.id);
    assert.equal(item.movieId, movie.id);
    assert.equal(item.status, "PLANNED");
    assert.equal(item.rating, 8);
    assert.equal(item.notes, "Test movie");
});

test("POST /watchlist rejects duplicate movie", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const firstResponse = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
        });

    assert.equal(firstResponse.status, 201);

    const secondResponse = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
        });

    assert.equal(secondResponse.status, 400);

    assert.equal(
        secondResponse.body.message,
        "Movie already in the watchlist"
    );
});

test("GET /watchlist returns only current user's watchlist", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    const userId = registerResponse.body.data.user.id;

    createdUserIds.push(userId);

    const addResponse = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
            status: "WATCHING",
            rating: 9,
        });

    assert.equal(addResponse.status, 201);

    const response = await agent
        .get("/watchlist");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const items = response.body.data.items;

    assert.equal(items.length, 1);

    assert.equal(items[0].userId, userId);
    assert.equal(items[0].movieId, movie.id);
    assert.equal(items[0].status, "WATCHING");
    assert.equal(items[0].rating, 9);

    // Movie relation should be included
    assert.ok(items[0].movie);
    assert.equal(items[0].movie.id, movie.id);
});

test("PUT /watchlist/:id updates watchlist item", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const addResponse = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
            status: "PLANNED",
            rating: 5,
            notes: "Initial note",
        });

    assert.equal(addResponse.status, 201);

    const itemId = addResponse.body.data.watchListItem.id;

    const response = await agent
        .put(`/watchlist/${itemId}`)
        .send({
            status: "COMPLETED",
            rating: 10,
            notes: "Finished watching",
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const updatedItem = response.body.data.watchlistItem;

    assert.equal(updatedItem.id, itemId);
    assert.equal(updatedItem.status, "COMPLETED");
    assert.equal(updatedItem.rating, 10);
    assert.equal(updatedItem.notes, "Finished watching");
});

test("PUT /watchlist/:id rejects invalid rating", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const addResponse = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
        });

    assert.equal(addResponse.status, 201);

    const itemId = addResponse.body.data.watchListItem.id;

    const response = await agent
        .put(`/watchlist/${itemId}`)
        .send({
            rating: 11,
        });

    assert.equal(response.status, 400);
});

test("User cannot update another user's watchlist item", async () => {
    const movie = await createTestMovie();

    const userA = createTestUser();
    const userB = createTestUser();

    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register User A
    const registerA = await agentA
        .post("/auth/register")
        .send(userA);

    assert.equal(registerA.status, 201);

    createdUserIds.push(registerA.body.data.user.id);

    // Register User B
    const registerB = await agentB
        .post("/auth/register")
        .send(userB);

    assert.equal(registerB.status, 201);

    createdUserIds.push(registerB.body.data.user.id);

    // User A creates watchlist item
    const addResponse = await agentA
        .post("/watchlist")
        .send({
            movieId: movie.id,
            status: "PLANNED",
        });

    assert.equal(addResponse.status, 201);

    const itemId = addResponse.body.data.watchListItem.id;

    // User B tries to update User A's item
    const response = await agentB
        .put(`/watchlist/${itemId}`)
        .send({
            status: "COMPLETED",
            rating: 10,
        });

    assert.equal(response.status, 403);

    assert.equal(
        response.body.message,
        "Not allowed to update this watchlist item"
    );
});

test("User cannot delete another user's watchlist item", async () => {
    const movie = await createTestMovie();

    const userA = createTestUser();
    const userB = createTestUser();

    const agentA = request.agent(app);
    const agentB = request.agent(app);

    const registerA = await agentA
        .post("/auth/register")
        .send(userA);

    assert.equal(registerA.status, 201);

    createdUserIds.push(registerA.body.data.user.id);

    const registerB = await agentB
        .post("/auth/register")
        .send(userB);

    assert.equal(registerB.status, 201);

    createdUserIds.push(registerB.body.data.user.id);

    const addResponse = await agentA
        .post("/watchlist")
        .send({
            movieId: movie.id,
        });

    assert.equal(addResponse.status, 201);

    const itemId = addResponse.body.data.watchListItem.id;

    const response = await agentB
        .delete(`/watchlist/${itemId}`);

    assert.equal(response.status, 403);

    assert.equal(
        response.body.message,
        "Not allowed to delete this watchlist item"
    );
});

test("User can delete own watchlist item", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const addResponse = await agent
        .post("/watchlist")
        .send({
            movieId: movie.id,
        });

    assert.equal(addResponse.status, 201);

    const itemId = addResponse.body.data.watchListItem.id;

    const response = await agent
        .delete(`/watchlist/${itemId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(
        response.body.message,
        "Movie removed from watchlist"
    );

    // Verify item is actually deleted
    const checkResponse = await agent
        .get("/watchlist");

    assert.equal(checkResponse.status, 200);
    assert.equal(checkResponse.body.data.items.length, 0);
});

// WatchProgess Test 
test("GET /api/watch-progress requires authentication", async () => {
    const response = await request(app)
        .get("/api/watch-progress");

    assert.equal(response.status, 401);
});

test("GET /api/watch-progress/:movieId returns null when no progress exists", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .get(`/api/watch-progress/${movie.id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(response.body.data.progress, null);
});

test("PUT /api/watch-progress/:movieId creates watch progress", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 120,
            durationSeconds: 600,
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const progress = response.body.data.progress;

    assert.equal(progress.userId, registerResponse.body.data.user.id);
    assert.equal(progress.movieId, movie.id);
    assert.equal(progress.positionSeconds, 120);
    assert.equal(progress.durationSeconds, 600);
    assert.equal(progress.completed, false);
});

test("PUT /api/watch-progress/:movieId updates existing progress", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const firstResponse = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 100,
            durationSeconds: 1000,
        });

    assert.equal(firstResponse.status, 200);

    const firstProgress = firstResponse.body.data.progress;

    const secondResponse = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 400,
            durationSeconds: 1000,
        });

    assert.equal(secondResponse.status, 200);

    const secondProgress = secondResponse.body.data.progress;

    // Same database record
    assert.equal(secondProgress.id, firstProgress.id);

    // Updated values
    assert.equal(secondProgress.positionSeconds, 400);
    assert.equal(secondProgress.durationSeconds, 1000);
    assert.equal(secondProgress.completed, false);

    // Verify only one progress record exists
    const count = await prisma.watchProgress.count({
        where: {
            userId: registerResponse.body.data.user.id,
            movieId: movie.id,
        },
    });

    assert.equal(count, 1);
});

test("PUT /api/watch-progress/:movieId rejects invalid progress", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: -10,
            durationSeconds: 600,
        });

    assert.equal(response.status, 400);
    assert.equal(
        response.body.message,
        "Invalid video progress"
    );
});

test("PUT /api/watch-progress/:movieId caps position at duration", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 700,
            durationSeconds: 600,
        });

    assert.equal(response.status, 200);

    const progress = response.body.data.progress;

    assert.equal(progress.positionSeconds, 600);
    assert.equal(progress.durationSeconds, 600);
    assert.equal(progress.completed, true);
});

test("PUT /api/watch-progress/:movieId marks movie completed near the end", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 596,
            durationSeconds: 600,
        });

    assert.equal(response.status, 200);

    const progress = response.body.data.progress;

    assert.equal(progress.positionSeconds, 596);
    assert.equal(progress.durationSeconds, 600);
    assert.equal(progress.completed, true);
});

test("PATCH /api/watch-progress/:movieId/complete marks movie completed", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    // Create progress first
    const saveResponse = await agent
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 200,
            durationSeconds: 1000,
        });

    assert.equal(saveResponse.status, 200);
    assert.equal(
        saveResponse.body.data.progress.completed,
        false
    );

    // Mark completed
    const response = await agent
        .patch(`/api/watch-progress/${movie.id}/complete`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const progress = response.body.data.progress;

    assert.equal(progress.movieId, movie.id);
    assert.equal(progress.completed, true);
});

test("GET /api/watch-progress returns unfinished movies for Continue Watching", async () => {
    const user = createTestUser();

    const movieA = await createTestMovie();
    const movieB = await createTestMovie();
    const movieC = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    // Movie A: unfinished
    const responseA = await agent
        .put(`/api/watch-progress/${movieA.id}`)
        .send({
            positionSeconds: 200,
            durationSeconds: 1000,
        });

    assert.equal(responseA.status, 200);

    // Movie B: completed
    const responseB = await agent
        .put(`/api/watch-progress/${movieB.id}`)
        .send({
            positionSeconds: 1000,
            durationSeconds: 1000,
        });

    assert.equal(responseB.status, 200);
    assert.equal(
        responseB.body.data.progress.completed,
        true
    );

    // Movie C: position = 0
    const responseC = await agent
        .put(`/api/watch-progress/${movieC.id}`)
        .send({
            positionSeconds: 0,
            durationSeconds: 1000,
        });

    assert.equal(responseC.status, 200);

    // Get Continue Watching
    const response = await agent
        .get("/api/watch-progress");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const movies = response.body.data.movies;

    // Only Movie A should appear
    assert.equal(movies.length, 1);

    assert.equal(movies[0].movie.id, movieA.id);
    assert.equal(movies[0].positionSeconds, 200);
    assert.equal(movies[0].durationSeconds, 1000);

    // 200 / 1000 * 100 = 20
    assert.equal(movies[0].progress, 20);

    // 1000 - 200 = 800
    assert.equal(movies[0].remainingSeconds, 800);

    // ceil(800 / 60) = 14
    assert.equal(movies[0].remainingMinutes, 14);

    assert.ok(movies[0].updatedAt);
});

test("User cannot access another user's watch progress", async () => {
    const movie = await createTestMovie();

    const userA = createTestUser();
    const userB = createTestUser();

    const agentA = request.agent(app);
    const agentB = request.agent(app);

    // Register User A
    const registerA = await agentA
        .post("/auth/register")
        .send(userA);

    assert.equal(registerA.status, 201);

    createdUserIds.push(registerA.body.data.user.id);

    // Register User B
    const registerB = await agentB
        .post("/auth/register")
        .send(userB);

    assert.equal(registerB.status, 201);

    createdUserIds.push(registerB.body.data.user.id);

    // User A creates progress
    const saveResponse = await agentA
        .put(`/api/watch-progress/${movie.id}`)
        .send({
            positionSeconds: 300,
            durationSeconds: 1000,
        });

    assert.equal(saveResponse.status, 200);

    // User B requests the same movie
    const response = await agentB
        .get(`/api/watch-progress/${movie.id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    // User B has no progress for this movie
    assert.equal(response.body.data.progress, null);
});

test("GET /api/watch-progress/:movieId returns 404 for unknown movie", async () => {
    const user = createTestUser();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const fakeMovieId = randomUUID();

    const response = await agent
        .get(`/api/watch-progress/${fakeMovieId}`);

    assert.equal(response.status, 404);
    assert.equal(response.body.message, "Movie not found");
});

test("PUT /api/watch-progress/:movieId returns 404 for unknown movie", async () => {
    const user = createTestUser();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const fakeMovieId = randomUUID();

    const response = await agent
        .put(`/api/watch-progress/${fakeMovieId}`)
        .send({
            positionSeconds: 100,
            durationSeconds: 500,
        });

    assert.equal(response.status, 404);
    assert.equal(response.body.message, "Movie not found");
});

test("PATCH complete returns 404 when watch progress does not exist", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .patch(`/api/watch-progress/${movie.id}/complete`);

    assert.equal(response.status, 404);

    assert.equal(
        response.body.message,
        "Watch progress not found"
    );
});

// Public API
test("GET /movies returns movies with pagination", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .get("/movies")
        .query({
        page: 1,
        limit: 10,
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    assert.ok(Array.isArray(response.body.data.movies));

    assert.equal(response.body.data.pagination.page, 1);
    assert.equal(response.body.data.pagination.limit, 10);

    const foundMovie = response.body.data.movies.find(
        (item) => item.id === movie.id
    );

    assert.ok(foundMovie);
});

test("GET /movies searches movies by title", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .get("/movies")
        .query({
        search: movie.title,
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const movies = response.body.data.movies;

    assert.ok(
        movies.some((item) => item.id === movie.id)
    );
});

test("GET /movies filters movies by genre", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .get("/movies")
        .query({
        genre: "Drama",
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    const movies = response.body.data.movies;

    assert.ok(
        movies.some((item) => item.id === movie.id)
    );
});

test("GET /movies/:id returns movie by id", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .get(`/movies/${movie.id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    assert.equal(response.body.data.movie.id, movie.id);
    assert.equal(response.body.data.movie.title, movie.title);
});

test("GET /movies/:id returns 404 for unknown movie", async () => {
    const fakeMovieId = randomUUID();

    const response = await request(app)
        .get(`/movies/${fakeMovieId}`);

    assert.equal(response.status, 404);
    assert.equal(response.body.status, "error");
    assert.equal(response.body.message, "Movie not found");
});

test("POST /movies requires authentication", async () => {
    const response = await request(app)
        .post("/movies")
        .send({
        title: "Unauthorized Movie",
        releaseYear: 2026,
        genres: ["Drama"],
        });

    assert.equal(response.status, 401);
});

test("POST /movies rejects normal USER", async () => {
    const user = createTestUser();

    const cookies = await registerAndLogin(user);

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
        title: "User Movie",
        releaseYear: 2026,
        genres: ["Drama"],
        });

    assert.equal(response.status, 403);
    assert.equal(response.body.status, "error");
    assert.equal(response.body.message, "Admin access required");
});

test("POST /movies allows ADMIN to create movie", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
        email: admin.email,
        password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
        title: "Admin Created Movie",
        overview: "Created by admin",
        releaseYear: 2026,
        genres: ["Action", "Drama"],
        runtime: 120,
        posterUrl: "https://example.com/poster.jpg",
        videoPath: "movies/admin-created.mp4",
        });

    assert.equal(response.status, 201);
    assert.equal(response.body.status, "success");

    const movie = response.body.data.movie;

    assert.equal(movie.title, "Admin Created Movie");
    assert.equal(movie.releaseYear, 2026);
    assert.deepEqual(movie.genres, ["Action", "Drama"]);
    assert.equal(movie.runtime, 120);
    assert.equal(movie.createdBy, admin.id);

    createdMovieIds.push(movie.id);
});

test("POST /movies rejects invalid movie data", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
        email: admin.email,
        password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
        title: "",
        releaseYear: 2026,
        });

    assert.equal(response.status, 400);
});

test("PUT /movies/:id requires authentication", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .put(`/movies/${movie.id}`)
        .send({
        title: "Updated Movie",
        });

    assert.equal(response.status, 401);
});

test("PUT /movies/:id rejects normal USER", async () => {
    const movie = await createTestMovie();

    const user = createTestUser();
    const cookies = await registerAndLogin(user);

    const response = await request(app)
        .put(`/movies/${movie.id}`)
        .set("Cookie", cookies)
        .send({
        title: "Updated By User",
        });

    assert.equal(response.status, 403);
    assert.equal(response.body.message, "Admin access required");
});

test("PUT /movies/:id allows ADMIN to update movie", async () => {
    const movie = await createTestMovie();

    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
        email: admin.email,
        password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .put(`/movies/${movie.id}`)
        .set("Cookie", cookies)
        .send({
        title: "Updated Movie Title",
        releaseYear: 2025,
        genres: ["Comedy"],
        runtime: 100,
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    assert.equal(
        response.body.data.movie.title,
        "Updated Movie Title"
    );

    assert.equal(
        response.body.data.movie.releaseYear,
        2025
    );

    assert.deepEqual(
        response.body.data.movie.genres,
        ["Comedy"]
    );

    assert.equal(
        response.body.data.movie.runtime,
        100
    );
});

test("PUT /movies/:id returns 404 for unknown movie", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
        email: admin.email,
        password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .put(`/movies/${randomUUID()}`)
        .set("Cookie", cookies)
        .send({
        title: "Updated Movie",
        });

    assert.equal(response.status, 404);
    assert.equal(response.body.message, "Movie not found");
});


test("DELETE /movies/:id requires authentication", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .delete(`/movies/${movie.id}`);

    assert.equal(response.status, 401);
});

test("DELETE /movies/:id rejects normal USER", async () => {
    const movie = await createTestMovie();

    const user = createTestUser();
    const cookies = await registerAndLogin(user);

    const response = await request(app)
        .delete(`/movies/${movie.id}`)
        .set("Cookie", cookies);

    assert.equal(response.status, 403);
    assert.equal(response.body.message, "Admin access required");
});

test("DELETE /movies/:id allows ADMIN to delete movie", async () => {
    const movie = await createTestMovie();

    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
        email: admin.email,
        password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .delete(`/movies/${movie.id}`)
        .set("Cookie", cookies);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(
        response.body.message,
        "Movie deleted successfully"
    );

    const deletedMovie = await prisma.movie.findUnique({
        where: { id: movie.id },
    });

    assert.equal(deletedMovie, null);

    // Không để cleanup cố delete movie đã bị xóa
    const index = createdMovieIds.indexOf(movie.id);
    if (index !== -1) {
        createdMovieIds.splice(index, 1);
    }
});

test("DELETE /movies/:id returns 404 for unknown movie", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
        email: admin.email,
        password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .delete(`/movies/${randomUUID()}`)
        .set("Cookie", cookies);

    assert.equal(response.status, 404);
    assert.equal(response.body.message, "Movie not found");
});

test("POST /movies rejects invalid release year", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: admin.email,
            password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
            title: "Invalid Year Movie",
            releaseYear: 1800,
            genres: ["Drama"],
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
});

test("POST /movies rejects invalid runtime", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: admin.email,
            password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
            title: "Invalid Runtime Movie",
            releaseYear: 2026,
            runtime: -10,
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
});


test("POST /movies rejects invalid poster URL", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: admin.email,
            password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
            title: "Invalid Poster Movie",
            releaseYear: 2026,
            posterUrl: "not-a-url",
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
});

test("POST /movies rejects invalid genres", async () => {
    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: admin.email,
            password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .post("/movies")
        .set("Cookie", cookies)
        .send({
            title: "Invalid Genres Movie",
            releaseYear: 2026,
            genres: "Action",
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
});

test("PUT /movies/:id rejects invalid data", async () => {
    const movie = await createTestMovie();

    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: admin.email,
            password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .put(`/movies/${movie.id}`)
        .set("Cookie", cookies)
        .send({
            title: "",
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
});

test("PUT /movies/:id updates only provided fields", async () => {
    const movie = await createTestMovie();

    const originalOverview = movie.overview;
    const originalGenres = movie.genres;
    const originalRuntime = movie.runtime;

    const admin = await createTestAdmin();

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: admin.email,
            password: admin.plainPassword,
        });

    assert.equal(loginResponse.status, 200);

    const cookies = loginResponse.headers["set-cookie"];

    const response = await request(app)
        .put(`/movies/${movie.id}`)
        .set("Cookie", cookies)
        .send({
            title: "Only Title Updated",
        });

    assert.equal(response.status, 200);

    const updatedMovie = response.body.data.movie;

    assert.equal(updatedMovie.title, "Only Title Updated");

    assert.equal(updatedMovie.overview, originalOverview);
    assert.deepEqual(updatedMovie.genres, originalGenres);
    assert.equal(updatedMovie.runtime, originalRuntime);
});

test("GET /movies/:id/cast returns 404 for unknown movie", async () => {
    const fakeMovieId = randomUUID();

    const response = await request(app)
        .get(`/movies/${fakeMovieId}/cast`);

    assert.equal(response.status, 404);
    assert.equal(response.body.status, "error");
    assert.equal(response.body.message, "Movie not found");
});

test("GET /movies/:id/cast returns movie cast", async () => {
    const movie = await createTestMovie();

    const fetchMock = mock.method(global, "fetch", async (url) => {
        if (url.includes("/search/movie")) {
            return new Response(
                JSON.stringify({
                    results: [
                        {
                            id: 12345,
                            title: movie.title,
                        },
                    ],
                }),
                {
                    status: 200,
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
        }

        if (url.includes("/movie/12345/credits")) {
            return new Response(
                JSON.stringify({
                    cast: Array.from({ length: 12 }, (_, index) => ({
                        id: index + 1,
                        name: `Actor ${index + 1}`,
                        character: `Character ${index + 1}`,
                    })),
                }),
                {
                    status: 200,
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
        }

        throw new Error(`Unexpected URL: ${url}`);
    });

    try {
        const response = await request(app)
            .get(`/movies/${movie.id}/cast`);

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");

        assert.equal(
            response.body.data.tmdbMovieId,
            12345
        );

        assert.ok(
            Array.isArray(response.body.data.cast)
        );

        // Controller chỉ lấy 10 diễn viên
        assert.equal(
            response.body.data.cast.length,
            10
        );

        assert.equal(
            response.body.data.cast[0].name,
            "Actor 1"
        );

        assert.equal(
            response.body.data.cast[0].character,
            "Character 1"
        );

        // Kiểm tra tmdbId đã được lưu vào database
        const savedMovie = await prisma.movie.findUnique({
            where: { id: movie.id },
        });

        assert.equal(savedMovie.tmdbId, 12345);

        // Kiểm tra Cache-Control header
        assert.match(
            response.headers["cache-control"],
            /max-age=3600/
        );

    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /movies/:id/cast returns 404 when TMDB movie is not found", async () => {
    const movie = await createTestMovie();

    const fetchMock = mock.method(global, "fetch", async () => {
        return new Response(
            JSON.stringify({
                results: [],
            }),
            {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            }
        );
    });

    try {
        const response = await request(app)
            .get(`/movies/${movie.id}/cast`);

        assert.equal(response.status, 404);
        assert.equal(response.body.status, "error");
        assert.equal(
            response.body.message,
            "Movie not found on TMDB"
        );
    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /movies/:id/cast uses stored TMDB ID", async () => {
    const movie = await createTestMovie();

    await prisma.movie.update({
        where: { id: movie.id },
        data: { tmdbId: 12345 },
    });

    const fetchMock = mock.method(
        global,
        "fetch",
        async (url) => {
            assert.equal(
                url,
                "https://api.themoviedb.org/3/movie/12345/credits"
            );

            return new Response(
                JSON.stringify({
                    cast: [],
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    );

    try {
        const response = await request(app)
            .get(`/movies/${movie.id}/cast`);

        assert.equal(response.status, 200);
        assert.equal(fetchMock.mock.callCount(), 1);
    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /api/videos/:movieId requires authentication", async () => {
    const movie = await createTestMovie();

    const response = await request(app)
        .get(`/api/videos/${movie.id}`);

    assert.equal(response.status, 401);
});

test("GET /api/videos/:movieId returns 404 for unknown movie", async () => {
    const user = createTestUser();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const fakeMovieId = randomUUID();

    const response = await agent
        .get(`/api/videos/${fakeMovieId}`);

    assert.equal(response.status, 404);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Movie not found"
    );
});

test("GET /api/videos/:movieId returns 404 when movie has no video", async () => {
    const user = createTestUser();
    const movie = await createTestMovie();

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const response = await agent
        .get(`/api/videos/${movie.id}`);

    assert.equal(response.status, 404);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Video is not available for this movie"
    );
});

test("GET /api/videos/:movieId returns signed video URL", async () => {
    const user = createTestUser();

    const movieUser = await prisma.user.create({
        data: {
            name: "Video Movie Creator",
            email: `video-creator-${randomUUID()}@example.com`,
            password: "hashed-password",
            role: "USER",
        },
    });

    createdUserIds.push(movieUser.id);

    const movie = await prisma.movie.create({
        data: {
            title: `Video Test Movie ${randomUUID()}`,
            releaseYear: 2026,
            genres: ["Drama"],
            runtime: 120,
            videoPath: "movies/test-video.mp4",
            createdBy: movieUser.id,
        },
    });

    createdMovieIds.push(movie.id);

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const expectedSignedUrl =
        "https://example.supabase.co/signed-video";

    const fromMock = mock.method(
        supabaseAdmin.storage,
        "from",
        (bucket) => {
            assert.equal(bucket, process.env.SUPABASE_BUCKET);

            return {
                createSignedUrl: async (path, expiresIn) => {
                    assert.equal(
                        path,
                        "movies/test-video.mp4"
                    );

                    assert.equal(
                        expiresIn,
                        14400
                    );

                    return {
                        data: {
                            signedUrl: expectedSignedUrl,
                        },
                        error: null,
                    };
                },
            };
        }
    );

    try {
        const response = await agent
            .get(`/api/videos/${movie.id}`);

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");

        assert.equal(
            response.body.data.url,
            expectedSignedUrl
        );

        assert.equal(
            response.body.data.expiresIn,
            14400
        );
    } finally {
        fromMock.mock.restore();
    }
});

test("GET /api/videos/:movieId returns 502 when Supabase fails", async () => {
    const user = createTestUser();

    const movieUser = await prisma.user.create({
        data: {
            name: "Video Error Creator",
            email: `video-error-${randomUUID()}@example.com`,
            password: "hashed-password",
            role: "USER",
        },
    });

    createdUserIds.push(movieUser.id);

    const movie = await prisma.movie.create({
        data: {
            title: `Video Error Movie ${randomUUID()}`,
            releaseYear: 2026,
            genres: ["Drama"],
            runtime: 120,
            videoPath: "movies/error-video.mp4",
            createdBy: movieUser.id,
        },
    });

    createdMovieIds.push(movie.id);

    const agent = request.agent(app);

    const registerResponse = await agent
        .post("/auth/register")
        .send(user);

    assert.equal(registerResponse.status, 201);

    createdUserIds.push(registerResponse.body.data.user.id);

    const fromMock = mock.method(
        supabaseAdmin.storage,
        "from",
        () => ({
            createSignedUrl: async () => ({
                data: null,
                error: new Error("Supabase storage error"),
            }),
        })
    );

    try {
        const response = await agent
            .get(`/api/videos/${movie.id}`);

        assert.equal(response.status, 502);
        assert.equal(response.body.status, "error");
        assert.equal(
            response.body.message,
            "Failed to create video URL"
        );
    } finally {
        fromMock.mock.restore();
    }
});

test("GET /trending/people returns 500 when TMDB token is missing", async () => {
    const originalToken = process.env.TMDB_READ_ACCESS_TOKEN;

    delete process.env.TMDB_READ_ACCESS_TOKEN;

    try {
        const response = await request(app)
            .get("/trending/people");

        assert.equal(response.status, 500);
        assert.equal(response.body.status, "error");
        assert.equal(response.body.message, "TMDB token is missing");
    } finally {
        process.env.TMDB_READ_ACCESS_TOKEN = originalToken;
    }
});

test("GET /trending/people returns TMDB error", async () => {
    const fetchMock = mock.method(
        global,
        "fetch",
        async (url, options) => {
            assert.equal(
                url,
                "https://api.themoviedb.org/3/trending/person/week"
            );

            assert.equal(
                options.headers.Authorization,
                `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
            );

            assert.equal(
                options.headers.Accept,
                "application/json"
            );

            return new Response(
                JSON.stringify({
                    status_message: "Invalid API key",
                }),
                {
                    status: 401,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    );

    try {
        const response = await request(app)
            .get("/trending/people");

        assert.equal(response.status, 401);
        assert.equal(response.body.status, "error");
        assert.equal(response.body.message, "Invalid API key");
    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /trending/people returns trending people", async () => {
    const fetchMock = mock.method(
        global,
        "fetch",
        async (url) => {
            assert.equal(
                url,
                "https://api.themoviedb.org/3/trending/person/week"
            );

            return new Response(
                JSON.stringify({
                    results: [
                        {
                            id: 101,
                            name: "Person One",
                            adult: false,
                            known_for_department: "Acting",
                            profile_path: "/person1.jpg",
                            popularity: 99.5,
                        },
                        {
                            id: 102,
                            name: "Person Two",
                            adult: false,
                            known_for_department: "Acting",
                            profile_path: "/person2.jpg",
                            popularity: 88.2,
                        },
                    ],
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    );

    try {
        const response = await request(app)
            .get("/trending/people");

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");

        // Kiểm tra Cache-Control
        assert.match(
            response.headers["cache-control"],
            /max-age=600/
        );

        assert.deepEqual(
            response.body.data.people,
            [
                {
                    id: 101,
                    name: "Person One",
                    rank: 1,
                    imageUrl:
                        "https://image.tmdb.org/t/p/w342/person1.jpg",
                    popularity: 99.5,
                },
                {
                    id: 102,
                    name: "Person Two",
                    rank: 2,
                    imageUrl:
                        "https://image.tmdb.org/t/p/w342/person2.jpg",
                    popularity: 88.2,
                },
            ]
        );
    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /trending/people filters people without profile image", async () => {
    const fetchMock = mock.method(
        global,
        "fetch",
        async () => {
            return new Response(
                JSON.stringify({
                    results: [
                        {
                            id: 201,
                            name: "Person With Image",
                            adult: false,
                            known_for_department: "Acting",
                            profile_path: "/person.jpg",
                            popularity: 70,
                        },
                        {
                            id: 202,
                            name: "Person Without Image",
                            adult: false,
                            known_for_department: "Acting",
                            profile_path: null,
                            popularity: 60,
                        },
                    ],
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    );

    try {
        const response = await request(app)
            .get("/trending/people");

        assert.equal(response.status, 200);

        assert.deepEqual(
            response.body.data.people,
            [
                {
                    id: 201,
                    name: "Person With Image",
                    rank: 1,
                    imageUrl:
                        "https://image.tmdb.org/t/p/w342/person.jpg",
                    popularity: 70,
                },
            ]
        );
    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /trending/people filters adult people", async () => {
    const fetchMock = mock.method(
        global,
        "fetch",
        async () =>
            new Response(
                JSON.stringify({
                    results: [
                        {
                            id: 301,
                            name: "Safe Actor",
                            adult: false,
                            known_for_department: "Acting",
                            profile_path: "/safe.jpg",
                            popularity: 80,
                        },
                        {
                            id: 302,
                            name: "Adult Actor",
                            adult: true,
                            known_for_department: "Acting",
                            profile_path: "/adult.jpg",
                            popularity: 90,
                        },
                    ],
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
    );

    try {
        const response = await request(app)
            .get("/trending/people");

        assert.equal(response.status, 200);
        assert.equal(response.body.data.people.length, 1);
        assert.equal(
            response.body.data.people[0].id,
            301
        );
    } finally {
        fetchMock.mock.restore();
    }
});

test("GET /trending/people returns empty list when TMDB returns no people", async () => {
    const fetchMock = mock.method(
        global,
        "fetch",
        async () => {
            return new Response(
                JSON.stringify({
                    results: [],
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    );

    try {
        const response = await request(app)
            .get("/trending/people");

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");
        assert.deepEqual(response.body.data.people, []);
    } finally {
        fetchMock.mock.restore();
    }
});

// Cleanup only users created by these tests
after(async () => {
    if (createdMovieIds.length > 0) {
        await prisma.watchProgress.deleteMany({
            where: {
                movieId: {
                    in: createdMovieIds,
                },
            },
        });

        await prisma.movie.deleteMany({
            where: {
                id: {
                    in: createdMovieIds,
                },
            },
        });
    }

    if (createdUserIds.length > 0) {
        await prisma.user.deleteMany({
            where: {
                id: {
                    in: createdUserIds,
                },
            },
        });
    }

    await prisma.$disconnect();
});

