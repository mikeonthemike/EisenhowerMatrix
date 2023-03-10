const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT,
    category TEXT
  )`);
});

app.post('/tasks', (req, res) => {
  const { task, category } = req.body;
  const stmt = db.prepare('INSERT INTO tasks (task, category) VALUES (?, ?)');
  stmt.run(task, category, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error saving task to database');
    } else {
      res.status(201).send('Task saved to database');
    }
  });
  stmt.finalize();
});

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error retrieving tasks from database');
    } else {
      res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
