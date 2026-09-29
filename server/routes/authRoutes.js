const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
        console.error(err);
        return res.status(500).json({
            message: "Registration failed"
        });
    }

    res.json({
        message: "Registration successful"
    });
});

    

    res.json({
        message: "Registration request received"
    });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Registration failed"
                });
            }

            return res.status(201).json({
                message: "Registration successful"
            });
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Registration failed"
        });
    }
});

module.exports = router;