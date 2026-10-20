
import { useEffect, useState } from "react";
import "./tasks.css";

function TaskManagement() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:5000/api/tasks";

    useEffect(() => {
        let cancelled = false;

        async function fetchTasks() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    if (!cancelled) setMessage("Please login first.");
                    return;
                }

                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (cancelled) return;

                if (!response.ok) {
                    setMessage(data.message || "Failed to fetch tasks");
                    return;
                }

                setTasks(data);
                setMessage("");
            } catch (error) {
                if (!cancelled) {
                    console.error("FETCH TASKS ERROR:", error);
                    setMessage("Unable to connect to the server.");
                }
            }
        }

        fetchTasks();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!title.trim()) {
            setMessage("Task title is required.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description,
                    deadline: deadline || null,
                    priority,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to create task");
                return;
            }

            setTasks((previousTasks) => [data.task, ...previousTasks]);
            setTitle("");
            setDescription("");
            setDeadline("");
            setPriority("Medium");
            setMessage("Task created successfully.");
        } catch (error) {
            console.error("CREATE TASK ERROR:", error);
            setMessage("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTask = async (task) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description || "",
                    deadline: task.deadline || null,
                    priority: task.priority || "Medium",
                    completed: !task.completed,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to update task");
                return;
            }

            setTasks((previousTasks) =>
                previousTasks.map((item) =>
                    item.id === task.id
                        ? { ...item, completed: !item.completed }
                        : item
                )
            );

            setMessage("Task updated successfully.");
        } catch (error) {
            console.error("UPDATE TASK ERROR:", error);
            setMessage("Unable to connect to the server.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to delete task");
                return;
            }

            setTasks((previousTasks) =>
                previousTasks.filter((task) => task.id !== taskId)
            );

            setMessage("Task deleted successfully.");
        } catch (error) {
            console.error("DELETE TASK ERROR:", error);
            setMessage("Unable to connect to the server.");
        }
    };

    return (
        <div className="task-container">
            <h1>Task Management</h1>

            {message && <p role="status">{message}</p>}

            <form onSubmit={handleCreateTask}>
                <div>
                    <label htmlFor="title">Task title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                    />
                </div>

                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        id="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Add Task"}
                </button>
            </form>

            <section>
                <h2>Your Tasks</h2>

                {tasks.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <h3>
                                    {task.title}{" "}
                                    {task.completed && "(Completed)"}
                                </h3>

                                <p>{task.description}</p>
                                <p>Deadline: {task.deadline || "Not set"}</p>
                                <p>Priority: {task.priority}</p>

                                <button
                                    type="button"
                                    onClick={() => handleUpdateTask(task)}
                                >
                                    {task.completed
                                        ? "Mark Incomplete"
                                        : "Mark Complete"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default TaskManagement;
