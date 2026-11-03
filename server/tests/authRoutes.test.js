const assert = require("node:assert/strict");
const Module = require("node:module");
const test = require("node:test");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const database = {
    users: [],
    query(sql, values, callback) {
        if (sql.startsWith("INSERT INTO users")) {
            const [name, email, password] = values;

            if (this.users.some((user) => user.email === email)) {
                const error = new Error("Duplicate email");
                error.code = "ER_DUP_ENTRY";
                callback(error);
                return;
            }

            const user = {
                id: this.users.length + 1,
                name,
                email,
                password
            };
            this.users.push(user);
            callback(null, { insertId: user.id });
            return;
        }

        const [email] = values;
        callback(
            null,
            this.users.filter((user) => user.email === email)
        );
    }
};

const databasePath = require.resolve("../config/db");
const databaseModule = new Module(databasePath);
databaseModule.filename = databasePath;
databaseModule.loaded = true;
databaseModule.exports = database;
require.cache[databasePath] = databaseModule;

const authRoutes = require("../routes/authRoutes");
const authMiddleware = require("../middleware/authMiddleware");
const jwtSecret = "auth-routes-test-secret";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/protected", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

test("registration, duplicate handling, login, and JWT authentication", async (t) => {
    const previousJwtSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = jwtSecret;
    database.users.length = 0;

    const server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    const baseUrl = `http://127.0.0.1:${server.address().port}`;

    async function post(path, body) {
        return fetch(`${baseUrl}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    try {
        await t.test("rejects missing and invalid registration/login inputs", async () => {
            assert.equal((await post("/api/auth/register", {})).status, 400);
            assert.equal((await post("/api/auth/register", {
                name: "Student",
                email: "not-an-email",
                password: "secret1"
            })).status, 400);
            assert.equal((await post("/api/auth/register", {
                name: "Student",
                email: "student@example.com",
                password: "short"
            })).status, 400);
            assert.equal((await post("/api/auth/login", {})).status, 400);
        });

        await t.test("saves a hashed password and rejects duplicate email", async () => {
            const response = await post("/api/auth/register", {
                name: "  Student  ",
                email: "Student@Example.com",
                password: "correct-horse"
            });
            const data = await response.json();

            assert.equal(response.status, 201);
            assert.equal(data.user.name, "Student");
            assert.equal(data.user.email, "student@example.com");
            assert.equal(database.users.length, 1);
            assert.notEqual(database.users[0].password, "correct-horse");
            assert.equal(
                await bcrypt.compare("correct-horse", database.users[0].password),
                true
            );

            const duplicate = await post("/api/auth/register", {
                name: "Another Student",
                email: "student@example.com",
                password: "another-password"
            });
            assert.equal(duplicate.status, 409);
        });

        await t.test("accepts valid login, rejects an incorrect password, and verifies JWT", async () => {
            const invalidLogin = await post("/api/auth/login", {
                email: "student@example.com",
                password: "wrong-password"
            });
            assert.equal(invalidLogin.status, 401);

            const login = await post("/api/auth/login", {
                email: "STUDENT@example.com",
                password: "correct-horse"
            });
            const data = await login.json();

            assert.equal(login.status, 200);
            assert.equal(data.user.email, "student@example.com");
            assert.equal(jwt.verify(data.token, jwtSecret).id, 1);

            const authenticated = await fetch(`${baseUrl}/protected`, {
                headers: { Authorization: `Bearer ${data.token}` }
            });
            assert.equal(authenticated.status, 200);
            assert.equal((await authenticated.json()).user.id, 1);

            const rejected = await fetch(`${baseUrl}/protected`, {
                headers: { Authorization: "Bearer invalid-token" }
            });
            assert.equal(rejected.status, 401);
        });
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });

        if (previousJwtSecret === undefined) {
            delete process.env.JWT_SECRET;
        } else {
            process.env.JWT_SECRET = previousJwtSecret;
        }
    }
});
