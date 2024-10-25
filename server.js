const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your_jwt_secret';

// Initialize database
const db = new sqlite3.Database('./todo-app.db', (err) => {
  if (err) console.error('Database opening error:', err);
});

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, description TEXT, priority TEXT, userId INTEGER)`);
});

// Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
    if (err) return res.status(500).send('Error registering user');
    res.status(201).send('User registered');
  });
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(401).send('Invalid credentials');
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');
  
  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

// Get all todos for the user
app.get('/todos', verifyToken, (req, res) => {
  db.all(`SELECT * FROM todos WHERE userId = ?`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).send('Failed to retrieve todos');
    res.json(rows);
  });
});

// Add a new todo
app.post('/todos', verifyToken, (req, res) => {
  const { description, priority } = req.body;
  db.run(`INSERT INTO todos (description, priority, userId) VALUES (?, ?, ?)`, [description, priority, req.user.id], function (err) {
    if (err) return res.status(500).send('Failed to add todo');
    res.status(201).send('Todo added');
  });
});

// Update a todo
app.put('/todos/:id', verifyToken, (req, res) => {
  const { description, priority } = req.body;
  db.run(`UPDATE todos SET description = ?, priority = ? WHERE id = ? AND userId = ?`, [description, priority, req.params.id, req.user.id], function (err) {
    if (err) return res.status(500).send('Failed to update todo');
    res.status(200).send('Todo updated');
  });
});

// Delete a todo
app.delete('/todos/:id', verifyToken, (req, res) => {
  db.run(`DELETE FROM todos WHERE id = ? AND userId = ?`, [req.params.id, req.user.id], function (err) {
    if (err) return res.status(500).send('Failed to delete todo');
    res.status(200).send('Todo deleted');
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
