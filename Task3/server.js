const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("students.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }
});

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)
`);

// GET Home
app.get("/", (req, res) => {
    res.send("Welcome to DecodeLabs Task 3");
});

// CREATE (POST)
app.post("/students", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    db.run(
        "INSERT INTO students(name) VALUES(?)",
        [name],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Student Added Successfully",
                id: this.lastID
            });
        }
    );
});

// READ (GET)
app.get("/students", (req, res) => {

    db.all("SELECT * FROM students", [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });

});

// UPDATE (PUT)
app.put("/students/:id", (req, res) => {

    const { name } = req.body;

    db.run(
        "UPDATE students SET name=? WHERE id=?",
        [name, req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Student Updated Successfully"
            });

        }
    );

});

// DELETE
app.delete("/students/:id", (req, res) => {

    db.run(
        "DELETE FROM students WHERE id=?",
        [req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Student Deleted Successfully"
            });

        }
    );

});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});