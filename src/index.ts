import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const dbFilePath = './src/db.json';

// Example initial database structure
let submissions: any[] = [];

// Read the initial database
const readDatabase = (): void => {
    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
        submissions = JSON.parse(data);
    } else {
        // Initialize db.json file if it doesn't exist
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
    }
};

// Write submissions to JSON file
const writeDatabase = (data: any[]): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Initialize the database
readDatabase();

// Root endpoint to display a welcome message
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, welcome to the server!');
});

// Endpoint to ping server
app.get('/ping', (req: Request, res: Response) => {
    res.json({ message: 'Server is alive!' });
});

// Endpoint to submit data
app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    
    submissions.push(newSubmission);
    writeDatabase(submissions);

    res.status(201).json({ success: true, data: newSubmission });
});

// Endpoint to read submissions
app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    } else {
        res.status(404).json({ error: 'Submission not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
