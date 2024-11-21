const express = require('express');
const mg = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mg.connect('mongodb://localhost:27017/Taskdb')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

// Define Task Schema
const taskSchema = new mg.Schema({
    title: { type: String, required: [true, 'Task title is required'], trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
});

mg.pluralize(null); // Prevent automatic pluralization of collection name
const Task = mg.model('task', taskSchema);

// Route to create a task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Title is required and must be a string.' });
        }

        // Create and save the task
        const newTask = new Task({ title, description });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Failed to create task.' });
    }
});

// Route to fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

// Route to mark a task as completed
app.put('/tasks/:id/complete', async (req, res) => {
    try {
        const taskId = req.params.id;

        // Find the task by ID and update its 'completed' field
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { completed: true },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Failed to mark task as completed.' });
    }
});

// Route to edit a task's details
app.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description } = req.body;

        // Validate input
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Title is required and must be a string.' });
        }

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }     

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Failed to update task.' });
    }
});

// Route to delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
