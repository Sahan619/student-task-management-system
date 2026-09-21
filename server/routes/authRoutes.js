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

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("Login request:");
    console.log("Email:", email);
    console.log("Password:", password);

    res.json({
        message: "Login request received"
    });
});

module.exports = router;