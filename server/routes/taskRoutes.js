const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE TASK
router.post("/", authMiddleware, (req, res) => {
    const { title, description, due_date } = req.body;

    const user_id = req.user.id;

    if (!title) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const sql = `
        INSERT INTO tasks (user_id, title, description, due_date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, title, description || null, due_date || null],
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to create task"
                });
            }

            return res.status(201).json({
                message: "Task created successfully",
                task: {
                    id: result.insertId,
                    user_id,
                    title,
                    description: description || null,
                    due_date: due_date || null,
                    status: "pending"
                }
            });
        }
    );
});

// GET USER TASKS
router.get("/", authMiddleware, (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT id, title, description, due_date, status, created_at
        FROM tasks
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch tasks"
            });
        }

        return res.status(200).json({
            tasks: results
        });
    });
});

// UPDATE TASK
router.put("/:id", authMiddleware, (req, res) => {
    const taskId = req.params.id;
    const user_id = req.user.id;

    const { title, description, due_date, status } = req.body;

    const sql = `
        UPDATE tasks
        SET title = ?, description = ?, due_date = ?, status = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [
            title,
            description || null,
            due_date || null,
            status,
            taskId,
            user_id
        ],
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to update task"
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

// DELETE TASK
router.delete("/:id", authMiddleware, (req, res) => {
    const taskId = req.params.id;
    const user_id = req.user.id;

    const sql = `
        DELETE FROM tasks
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [taskId, user_id], (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to delete task"
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
    });
});


module.exports = router;
