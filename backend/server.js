// backend/index.js or server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // or mysql

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const dbConfig = {
  host: "db",           // docker-compose service name
  user: "root",
  password: "root",
  database: "tasks_db"
};

let db;
(async () => {
  db = await mysql.createConnection(dbConfig);
  console.log("DB connected");
})();

// API route
app.get("/api/tasks", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks"); // make sure table exists
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    // basic validation
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const [result] = await db.query(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)",
      [title, false]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      completed: false
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});
// Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:5000");
});
