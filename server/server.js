const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Student Task Management API is running");
});

const PORT = 5000;

app.get("/api/test", authMiddleware, (req, res) => {
    res.json({
        message: "Authentication successful",
        user: req.user
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});