const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/mydatabase', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const taskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
});
const Task = mongoose.model('Task', taskSchema);


app.use(cors());
app.use(express.json()); 

// API endpoints
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
