const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
   
    const tasks = await Task.find({ userId: req.user });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: 'Title, Description, and Due Date are required' });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      status: status || 'Pending', 
      userId: req.user, 
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized to edit' });
    }


    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

