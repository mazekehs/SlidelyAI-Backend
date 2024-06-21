# SlidelyAI-Backend

This is a backend server built with Express and TypeScript. The server handles API requests for saving and retrieving submissions, which are stored in a JSON file.

## Features

- **Ping Endpoint**: A simple GET endpoint to check if the server is running.
- **Submit Endpoint**: A POST endpoint to save submission data.
- **Read Endpoint**: A GET endpoint to retrieve submission data by index.

## Prerequisites

- Node.js (latest version recommended)
- npm or yarn

## Getting Started

1. **Clone the repository**:
    ```sh
    git clone https://github.com/mazekehs/SlidelyAI-Backend.git
    cd SlidelyAI-Backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the server**:
    ```sh
    npm run dev
    ```

    The server will start on port 3000.

## API Endpoints

- **Ping Endpoint**: `GET /ping`
    - Response: `true`
- **Submit Endpoint**: `POST /submit`
    - Request Body:
      ```json
      {
        "name": "Your Name",
        "email": "your.email@example.com",
        "phone": "123-456-7890",
        "github_link": "https://github.com/your-repo",
        "stopwatch_time": "00:01:30"
      }
      ```
    - Response: `{ "success": true }`
- **Read Endpoint**: `GET /read?index=0`
    - Query Parameter: `index` (0-based index of the submission)
    - Response:
      ```json
      {
        "name": "Your Name",
        "email": "your.email@example.com",
        "phone": "123-456-7890",
        "github_link": "https://github.com/your-repo",
        "stopwatch_time": "00:01:30"
      }
      ```

## Project Structure

- `src/index.ts`: Main server file with endpoint definitions.
- `src/db.json`: JSON file used as a database to store submissions.
- 
## Acknowledgments

- Thank You
