const express = require("express");

const app = express();

// Middleware to read JSON data
app.use(express.json());

// GET API
app.get("/", (req, res) => {
    res.send("Welcome to DecodeLabs Backend API");
});

// POST API
app.post("/user", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    res.json({
        message: "Hello " + name
    });

});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});