const Task = require('../models/Task');

// @desc    Get Stats for Pie Charts and Progress Bars
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: req.user.id } }, // Only look at YOUR tasks
      {
        $group: {
          _id: "$category", // Group by 'Career', 'Health', etc.
          totalTasks: { $sum: 1 },
          completedTasks: { 
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } 
          }
        }
      },
      {
        $project: {
          category: "$_id",
          totalTasks: 1,
          completedTasks: 1,
          // Calculate efficiency % per category
          efficiency: { 
            $cond: [
              { $eq: ["$totalTasks", 0] }, 
              0, 
              { $multiply: [{ $divide: ["$completedTasks", "$totalTasks"] }, 100] }
            ]
          }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Analytics Error", error: err.message });
  }
};

// @desc    Get Tasks for Weekly/Monthly Planning
exports.getTasksByTimeframe = async (req, res) => {
  const { view } = req.query; // 'weekly', 'monthly', or 'yearly'
  // Logic to filter tasks based on date ranges would go here
  // For now, we return sorted tasks
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};