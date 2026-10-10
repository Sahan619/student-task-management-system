import React, { useEffect, useState } from "react";
import "./Tasks.css";

function TaskManagement() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("Medium");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:5000/api/tasks";

    // =====================================================
    // GET TASKS
    // =====================================================

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login first.");
                return;
            }

            const response = await fetch(API_URL, {
                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            console.log("GET TASKS RESPONSE:", data);

            if (!response.ok) {

                setMessage(
                    data.message || "Failed to fetch tasks"
                );

                return;
            }

            setTasks(data);
            setMessage("");

        } catch (error) {

            console.error("FETCH TASKS ERROR:", error);

            setMessage(
                "Unable to connect to the server."
            );
        }
    };


    // Load tasks when page opens
    useEffect(() => {
        fetchTasks();
    }, []);


    // =====================================================
    // CREATE TASK
    // =====================================================

    const handleCreateTask = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!title.trim()) {
            setMessage("Task title is required.");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login first.");
                return;
            }

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    title: title,
                    description: description,
                    deadline: deadline || null,
                    priority: priority
                })
            });

            const data = await response.json();

            console.log("CREATE TASK RESPONSE:", data);

            if (!response.ok) {

                setMessage(
                    data.message || "Failed to create task"
                );

                return;
            }

            // Add newly created task to screen
            setTasks((previousTasks) => [
                data.task,
                ...previousTasks
            ]);

            // Clear form
            setTitle("");
            setDescription("");
            setDeadline("");
            setPriority("Medium");

            setMessage("Task created successfully!");

        } catch (error) {

            console.error("CREATE TASK ERROR:", error);

            setMessage(
                "Unable to connect to the server."
            );

        } finally {
            setLoading(false);
        }
    };


    // =====================================================
    // DELETE TASK
    // =====================================================

    const handleDelete = async (taskId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/${taskId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setMessage(
                    data.message || "Failed to delete task"
                );

                return;
            }

            setTasks((previousTasks) =>
                previousTasks.filter(
                    (task) => task.id !== taskId
                )
            );

            setMessage("Task deleted successfully.");

        } catch (error) {

            console.error("DELETE ERROR:", error);

            setMessage(
                "Unable to connect to the server."
            );
        }
    };


    // =====================================================
    // COMPLETE TASK
    // =====================================================

    const handleComplete = async (task) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/${task.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        deadline: task.deadline,
                        priority: task.priority,
                        completed: task.completed ? 0 : 1
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setMessage(
                    data.message || "Failed to update task"
                );

                return;
            }

            setTasks((previousTasks) =>
                previousTasks.map((item) =>
                    item.id === task.id
                        ? {
                            ...item,
                            completed: task.completed ? 0 : 1
                        }
                        : item
                )
            );

        } catch (error) {

            console.error("UPDATE ERROR:", error);

            setMessage(
                "Unable to connect to the server."
            );
        }
    };


    return (

        <section className="task-section">

            <div className="task-container">

                {/* =====================================
                    CREATE TASK
                ====================================== */}

                <div className="task-card">

                    <div className="task-icon">
                        ✓
                    </div>

                    <h1>Add New Task</h1>

                    <p className="task-subtitle">
                        Create and organize your academic tasks
                    </p>

                    {message && (
                        <div
                            className={
                                message.includes("successfully")
                                    ? "task-success"
                                    : "task-error"
                            }
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleCreateTask}>

                        <label>Task Title</label>

                        <input
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <label>Description</label>

                        <textarea
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <label>Deadline</label>

                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(e.target.value)
                            }
                        />

                        <label>Priority</label>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                        >
                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>
                        </select>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Add Task"}
                        </button>

                    </form>

                </div>


                {/* =====================================
                    MY TASKS
                ====================================== */}

                <div className="task-card">

                    <h1>My Tasks</h1>

                    <p className="task-count">
                        {tasks.length}{" "}
                        {tasks.length === 1
                            ? "task"
                            : "tasks"}
                    </p>

                    {tasks.length === 0 ? (

                        <div className="no-tasks">
                            No tasks yet.
                        </div>

                    ) : (

                        <div className="task-list">

                            {tasks.map((task) => (

                                <div
                                    className={
                                        task.completed
                                            ? "task-item completed"
                                            : "task-item"
                                    }
                                    key={task.id}
                                >

                                    <div>

                                        <h3>
                                            {task.title}
                                        </h3>

                                        <p>
                                            {task.description}
                                        </p>

                                        <small>
                                            Priority:{" "}
                                            {task.priority}
                                        </small>

                                        {task.deadline && (
                                            <small>
                                                Deadline:{" "}
                                                {new Date(
                                                    task.deadline
                                                ).toLocaleDateString()}
                                            </small>
                                        )}

                                    </div>

                                    <div className="task-buttons">

                                        <button
                                            onClick={() =>
                                                handleComplete(task)
                                            }
                                        >
                                            {task.completed
                                                ? "Undo"
                                                : "Complete"}
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default TaskManagement;