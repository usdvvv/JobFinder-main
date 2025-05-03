
# JobFinder Application

A comprehensive job search platform with AI-powered features.

## Features

- AI-powered job matching
- Resume builder
- Interview preparation
- Coding practice
- AI therapist
- AI live assistant
- Peer chat

## Running the Application

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React frontend:
   ```
   npm run dev
   ```

## Running the Python Backend (for AI Job Search)

The AI Job Search feature requires a Python backend server to be running.

### Prerequisites

- Python 3.8 or higher
- Required Python packages:
  ```
  flask
  flask-cors
  pdfminer.six
  python-docx
  selenium
  requests
  ```

### Starting the Backend Server

1. Navigate to the server directory:
   ```
   cd src/server
   ```

2. Install the required Python packages:
   ```
   pip install flask flask-cors pdfminer.six python-docx selenium requests
   ```

3. Start the Flask server:
   ```
   python api.py
   ```

The server will run on http://localhost:5000 and will be used by the AI Job Search feature.

## Notes on AI Job Search Feature

The AI Job Search feature is designed to:

1. Accept PDF or DOCX format resumes
2. Analyze resumes with AI to find matching jobs
3. Allow searching for jobs by title

In a production environment, the backend would:
- Use Llama3-8B via Ollama for CV analysis
- Use Selenium for LinkedIn job scraping
- Automate job applications

For demonstration purposes, the current implementation uses mock data.
