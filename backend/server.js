const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Abilita CORS per tutte le richieste
app.use(express.json());

// Inizializza il database
let db = new sqlite3.Database('./db/warehouse.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the warehouse database.');
});

// Creazione delle tabelle
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity INTEGER NOT NULL
          )`);
});

// API endpoints
app.get('/api/items', (req, res) => {
  db.all(`SELECT * FROM items`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/api/items', (req, res) => {
  const { name, category, quantity } = req.body;
  db.run(`INSERT INTO items (name, category, quantity) VALUES (?, ?, ?)`,
         [name, category, quantity], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ id: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});