const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');


const mongoURI = process.env.MONGO_URI || "mongodb+srv://johnatj33:lGOi21JK3KetJ3iN@cluster0.kjqsuit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(mongoURI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.json(newUser);
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
  res.json(updatedUser);
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
