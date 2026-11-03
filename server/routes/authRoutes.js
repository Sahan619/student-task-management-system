const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/register", async (req, res) => {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            message: "Name, email, and password are required"
        });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password = body.password;

    if (!name || !email || typeof password !== "string" || !password) {
        return res.status(400).json({
            message: "Name, email, and password are required"
        });
    }

    if (name.length > 100) {
        return res.status(400).json({
            message: "Name must be 100 characters or fewer"
        });
    }

    if (email.length > 255 || !emailPattern.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    if (password.length < 6 || Buffer.byteLength(password, "utf8") > 72) {
        return res.status(400).json({
            message: "Password must be at least 6 characters and no more than 72 bytes"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "An account with this email already exists"
                    });
                }

                console.error("REGISTER ERROR:", err);
                return res.status(500).json({
                    message: "Registration failed"
                });
            }

            return res.status(201).json({
                message: "Registration successful",
                user: {
                    id: result.insertId,
                    name,
                    email
                }
            });
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            message: "Registration failed"
        });
    }
});

router.post("/login", (req, res) => {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const email = typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password = body.password;

    if (!email || typeof password !== "string" || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not configured");
        return res.status(500).json({
            message: "Authentication is not configured"
        });
    }

    const sql = "SELECT id, name, email, password FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("LOGIN ERROR:", err);
            return res.status(500).json({
                message: "Login failed"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        try {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("LOGIN ERROR:", error);
            return res.status(500).json({
                message: "Login failed"
            });
        }
    });
});

module.exports = router;
