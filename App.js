const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Storage setup
const upload = multer({ dest: "uploads/" });

// Data file
const DATA_FILE = "data.json";

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper function to generate hash
function generateHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(fileBuffer).digest("hex");
}

// Helper to read data
function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Helper to write data
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Upload Evidence
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        const file = req.file;
        const owner = req.body.owner;

        const hash = generateHash(file.path);

        const record = {
            fileName: file.originalname,
            hash: hash,
            owner: owner,
            timestamp: new Date().toISOString()
        };

        const data = readData();
        data.push(record);
        writeData(data);

        res.json({
            message: "File uploaded successfully",
            record: record
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify Evidence
app.post("/verify", upload.single("file"), (req, res) => {
    try {
        const file = req.file;
        const newHash = generateHash(file.path);

        const data = readData();

        const match = data.find(item => item.hash === newHash);

        if (match) {
            res.json({
                status: "VALID",
                message: "File is not tampered",
                record: match
            });
        } else {
            res.json({
                status: "TAMPERED",
                message: "File has been modified or not found"
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all evidence
app.get("/evidence", (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
