const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================================
// CREATE TASK
// POST /api/tasks
// ======================================================

router.post("/", authMiddleware, (req, res) => {

    const {
        title,
        description,
        deadline,
        priority
    } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const userId = req.user.id;

    const sql = `
        INSERT INTO tasks
        (user_id, title, description, deadline, priority, completed)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            title.trim(),
            description || "",
            deadline || null,
            priority || "Medium",
            0
        ],
        (err, result) => {

            if (err) {
                console.error("CREATE TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to create task",
                    error: err.message
                });
            }

            return res.status(201).json({
                message: "Task created successfully",
                task: {
                    id: result.insertId,
                    user_id: userId,
                    title: title.trim(),
                    description: description || "",
                    deadline: deadline || null,
                    priority: priority || "Medium",
                    completed: 0
                }
            });
        }
    );
});


// ======================================================
// GET ALL TASKS
// GET /api/tasks
// ======================================================

router.get("/", authMiddleware, (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            id,
            user_id,
            title,
            description,
            deadline,
            priority,
            completed,
            created_at
        FROM tasks
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error("GET TASKS ERROR:", err);

            return res.status(500).json({
                message: "Failed to get tasks",
                error: err.message
            });
        }

        return res.status(200).json(results);
    });
});


// ======================================================
// UPDATE TASK
// PUT /api/tasks/:id
// ======================================================

router.put("/:id", authMiddleware, (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.id;

    const {
        title,
        description,
        deadline,
        priority,
        completed
    } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const sql = `
        UPDATE tasks
        SET
            title = ?,
            description = ?,
            deadline = ?,
            priority = ?,
            completed = ?
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(
        sql,
        [
            title.trim(),
            description || "",
            deadline || null,
            priority || "Medium",
            completed ? 1 : 0,
            taskId,
            userId
        ],
        (err, result) => {

            if (err) {
                console.error("UPDATE TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to update task",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            return res.status(200).json({
                message: "Task updated successfully"
            });
        }
    );
});


// ======================================================
// DELETE TASK
// DELETE /api/tasks/:id
// ======================================================

router.delete("/:id", authMiddleware, (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.id;

    const sql = `
        DELETE FROM tasks
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(
        sql,
        [taskId, userId],
        (err, result) => {

            if (err) {
                console.error("DELETE TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to delete task",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            return res.status(200).json({
                message: "Task deleted successfully"
            });
        }
    );
});


module.exports = router;