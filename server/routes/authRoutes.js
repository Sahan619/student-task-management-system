const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    console.log("Register request:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

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