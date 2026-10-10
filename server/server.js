const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);


// ==========================================
// TEST
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "Student Task Management API is running"
    });

});


// ==========================================
// SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});