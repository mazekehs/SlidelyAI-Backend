"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
const dbFilePath = './src/db.json';
// Example initial database structure
let submissions = [];
// Read the initial database
const readDatabase = () => {
    if (fs_1.default.existsSync(dbFilePath)) {
        const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
        submissions = JSON.parse(data);
    }
    else {
        // Initialize db.json file if it doesn't exist
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
    }
};
// Write submissions to JSON file
const writeDatabase = (data) => {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};
// Initialize the database
readDatabase();
// Root endpoint to display a welcome message
app.get('/', (req, res) => {
    res.send('Hello, welcome to the server!');
});
// Endpoint to ping server
app.get('/ping', (req, res) => {
    res.json({ message: 'Server is alive!' });
});
// Endpoint to submit data
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    submissions.push(newSubmission);
    writeDatabase(submissions);
    res.status(201).json({ success: true, data: newSubmission });
});
// Endpoint to read submissions
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    }
    else {
        res.status(404).json({ error: 'Submission not found' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
