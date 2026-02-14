const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
// Import the controllers we just built
const { getTaskStats, getTasksByTimeframe } = require('../controllers/taskController');

// --- EXISTING CRUD ROUTES ---

// @route   POST api/tasks
// @desc    Create a task (Career/Health)
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      user: req.user.id 
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ deadline: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- NEW ADVANCED ROUTES FOR GRAPHS & PLANNING ---

// @route   GET api/tasks/stats
// @desc    Get analytics data for Pie Charts (Career vs Health)
router.get('/stats', auth, getTaskStats);

// @route   GET api/tasks/timeline
// @desc    Get tasks filtered for Weekly/Monthly/Yearly plans
router.get('/timeline', auth, getTasksByTimeframe);

module.exports = router;