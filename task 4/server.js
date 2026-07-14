const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("students.db");

// Create Table
db.run(`
CREATE TABLE IF NOT EXISTS students(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL
)
`);

// GET Students
app.get("/students",(req,res)=>{

    db.all("SELECT * FROM students",[],(err,rows)=>{

        if(err){
            return res.status(500).json({message:err.message});
        }

        res.json(rows);

    });

});

// POST Student
app.post("/students",(req,res)=>{

    const {name}=req.body;

    if(!name){

        return res.status(400).json({
            message:"Name is required"
        });

    }

    db.run(

        "INSERT INTO students(name) VALUES(?)",

        [name],

        function(err){

            if(err){

                return res.status(500).json({
                    message:err.message
                });

            }

            res.json({
                message:"Student Added Successfully"
            });

        }

    );

});

app.listen(3000,()=>{

    console.log("Server running on http://localhost:3000");

});