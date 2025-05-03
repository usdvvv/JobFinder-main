
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import time
import json
import base64
import threading
import queue
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Setup Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables for automation status and logs
automation_status = {
    "status": "idle",  # idle, running, paused, completed, failed
    "jobsTotal": 0,
    "jobsCompleted": 0,
    "jobsFailed": 0,
    "currentJobId": None,
    "currentJobTitle": None
}

automation_logs = []
log_id_counter = 1
automation_queue = queue.Queue()
automation_thread = None
pause_event = threading.Event()  # For pausing automation

# Mock functions for development, will be replaced by real functions
def extract_text_from_file(file_content, file_type):
    """Simulates extracting text from a PDF or DOCX file."""
    # In real implementation, use pdfminer.high_level or python-docx
    return "Extracted CV text would appear here."

def find_matching_jobs(cv_text):
    """Simulates the AI job matching function."""
    # Mock data 
    job_matches = [
        {
            "id": 1,
            "title": "Senior Frontend Developer",
            "matchScore": 92,
            "whyMatch": "Your extensive React experience and UI/UX skills align perfectly with this role.",
            "responsibilities": [
                "Develop responsive web applications using React",
                "Collaborate with UI/UX designers to implement designs",
                "Optimize application performance and user experience"
            ],
            "whyExcel": "Your portfolio demonstrates exceptional UI work and your experience with performance optimization will be valuable."
        },
        # ... keep existing code for job matches data
    ]
    return job_matches

def search_jobs_by_title(job_title):
    """Simulates searching for jobs by title on LinkedIn."""
    # Mock search results
    mock_search_results = [
        {
            "id": 101,
            "title": f"Senior {job_title}",
            "company": "TechCorp Inc.",
            "location": "San Francisco, CA",
            "salary": "$120K - $150K",
            "description": "We are looking for an experienced professional to join our team...",
            "posted": "2 days ago",
            "remote": True,
            "link": "https://linkedin.com/jobs/view/123456"
        },
        # ... keep existing code for search results data
    ]
    return mock_search_results

# Real automation functions would be imported or implemented here
def start_automated_job_search(job_title, cv_path=None):
    """Initiates automated job search using Selenium."""
    global automation_status, automation_logs, log_id_counter
    
    add_log("info", f"Starting automated job search for '{job_title}' positions")
    
    # Update status to running
    automation_status["status"] = "running"
    automation_status["jobsTotal"] = 8  # Example number of jobs
    
    # Simulate Chrome launch
    add_log("info", "Launching Chrome browser...")
    time.sleep(1)
    add_log("info", "Chrome launched successfully")
    
    # Simulate LinkedIn navigation
    add_log("search", "Navigating to LinkedIn jobs page...")
    time.sleep(1)
    add_log("success", "LinkedIn jobs page opened successfully")
    
    # Simulate search
    add_log("info", f"Searching for '{job_title}' positions...")
    time.sleep(2)
    add_log("success", "Search completed. Found job listings.")
    
    # Return job links that would be found
    job_links = [
        f"https://linkedin.com/jobs/view/job-{i}" for i in range(1, 9)
    ]
    
    return job_links

def apply_to_job_automated(job_url, candidate_data):
    """Simulates applying to a job via automation."""
    global automation_status, automation_logs, log_id_counter
    
    job_title = f"Position at Company {job_url.split('-')[-1]}"
    automation_status["currentJobId"] = int(job_url.split('-')[-1])
    automation_status["currentJobTitle"] = job_title
    
    add_log("info", f"Applying to: {job_url}")
    add_log("info", f"Job title: {job_title}")
    
    # Simulate loading page
    add_log("info", "Loading job page...")
    time.sleep(1)
    
    # Simulate checking buttons
    add_log("info", "Checking application options...")
    time.sleep(0.5)
    add_log("search", "Searching for 'Apply' button...")
    time.sleep(0.5)
    
    # Random success/failure simulation (80% success rate)
    if automation_status["currentJobId"] % 5 != 0:
        add_log("success", "Found Easy Apply button")
        add_log("info", "Filling application form...")
        time.sleep(1)
        add_log("success", "Filled personal information")
        add_log("success", "Resume uploaded successfully")
        add_log("success", f"Successfully applied to \"{job_title}\"")
        
        automation_status["jobsCompleted"] += 1
        return {"status": "completed", "jobTitle": job_title}
    else:
        add_log("error", "No Apply button found or application form error")
        add_log("error", f"Failed to apply to \"{job_title}\"")
        
        automation_status["jobsFailed"] += 1
        return {"status": "failed", "jobTitle": job_title}

def add_log(log_type, message):
    """Adds a log entry to the automation logs."""
    global automation_logs, log_id_counter
    
    log = {
        "id": log_id_counter,
        "type": log_type,
        "message": message,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.localtime())
    }
    
    automation_logs.append(log)
    log_id_counter += 1
    return log

def run_automation_thread(job_title):
    """Background thread to run the automation process."""
    global automation_status, automation_queue, pause_event
    
    try:
        # Start the automated job search
        job_links = start_automated_job_search(job_title)
        
        if not job_links:
            add_log("error", "No job links found. Automation failed.")
            automation_status["status"] = "failed"
            return
        
        automation_status["jobsTotal"] = len(job_links)
        add_log("info", f"Found {len(job_links)} jobs to apply for")
        
        # Process each job
        for i, job_url in enumerate(job_links):
            # Check if we should stop
            if automation_status["status"] == "completed":
                add_log("info", "Automation stopped by user")
                break
                
            # Check if we should pause
            if automation_status["status"] == "paused":
                add_log("info", "Automation paused by user")
                pause_event.wait()  # Wait until unpaused
                add_log("info", "Automation resumed")
            
            # Check if skip command was received
            skip_requested = False
            while not automation_queue.empty():
                command = automation_queue.get()
                if command == "skip":
                    skip_requested = True
                    add_log("warning", "Skipping current job as requested")
                    break
            
            if skip_requested:
                automation_status["jobsFailed"] += 1
                continue
            
            # Apply to the job
            candidate_data = {
                "full_name": "John Doe",
                "email": "johndoe@example.com",
                "phone": "+1234567890",
                "resume_path": "resume.pdf"
            }
            
            apply_to_job_automated(job_url, candidate_data)
            
            # Small delay between jobs
            time.sleep(2)
        
        # Mark as completed if all jobs were processed
        if automation_status["status"] == "running":
            automation_status["status"] = "completed"
            add_log("success", "Automation process completed successfully")
            
    except Exception as e:
        logger.error(f"Automation error: {str(e)}")
        add_log("error", f"Automation error: {str(e)}")
        automation_status["status"] = "failed"

@app.route('/api/analyze-cv', methods=['POST'])
def analyze_cv():
    """Endpoint to analyze uploaded CV and return job matches."""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Check file extension
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ['.pdf', '.docx']:
            return jsonify({'error': 'File must be PDF or DOCX format'}), 400
        
        # Save the file temporarily
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp_file.name)
        
        # Extract text from CV
        cv_text = extract_text_from_file(temp_file.name, file_ext)
        
        # Clean up temp file
        os.unlink(temp_file.name)
        
        # Find matching jobs
        job_matches = find_matching_jobs(cv_text)
        
        # Simulate processing time
        time.sleep(1)
        
        return jsonify({'job_matches': job_matches})
    
    except Exception as e:
        logger.error(f"Error in analyze-cv: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/search-jobs', methods=['POST'])
def search_jobs():
    """Endpoint to search for jobs by title."""
    try:
        data = request.json
        job_title = data.get('jobTitle', '')
        
        if not job_title:
            return jsonify({'error': 'Job title is required'}), 400
        
        # Search for jobs by title
        search_results = search_jobs_by_title(job_title)
        
        # Simulate processing time
        time.sleep(1)
        
        return jsonify({'search_results': search_results})
    
    except Exception as e:
        logger.error(f"Error in search-jobs: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/start-automation', methods=['POST'])
def start_automation():
    """Endpoint to start automated job search and application."""
    global automation_status, automation_logs, automation_thread, pause_event
    
    try:
        data = request.json
        job_title = data.get('jobTitle', '')
        
        if not job_title:
            return jsonify({'error': 'Job title is required'}), 400
        
        # Reset automation state
        automation_status = {
            "status": "running",
            "jobsTotal": 0,
            "jobsCompleted": 0,
            "jobsFailed": 0,
            "currentJobId": None,
            "currentJobTitle": None
        }
        
        automation_logs = []
        pause_event.set()  # Make sure it's not paused
        
        # Start a new thread for automation
        automation_thread = threading.Thread(
            target=run_automation_thread,
            args=(job_title,)
        )
        automation_thread.daemon = True
        automation_thread.start()
        
        return jsonify(automation_status)
    
    except Exception as e:
        logger.error(f"Error starting automation: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/control', methods=['POST'])
def control_automation():
    """Endpoint to control (pause/resume/stop/skip) automation."""
    global automation_status, automation_queue, pause_event
    
    try:
        data = request.json
        action = data.get('action', '')
        
        if not action:
            return jsonify({'error': 'Action is required'}), 400
        
        if action == 'pause':
            automation_status["status"] = "paused"
            pause_event.clear()
            add_log("info", "Automation paused by user")
        
        elif action == 'resume':
            automation_status["status"] = "running"
            pause_event.set()
            add_log("info", "Automation resumed by user")
        
        elif action == 'stop':
            automation_status["status"] = "completed"
            pause_event.set()  # Unblock the thread so it can exit
            add_log("info", "Automation stopped by user")
        
        elif action == 'skip':
            automation_queue.put("skip")
            add_log("warning", "Skip requested by user")
        
        return jsonify(automation_status)
    
    except Exception as e:
        logger.error(f"Error controlling automation: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/job-status', methods=['GET'])
def get_job_status():
    """Endpoint to get current automation status."""
    try:
        return jsonify(automation_status)
    
    except Exception as e:
        logger.error(f"Error getting job status: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/job-logs', methods=['GET'])
def get_job_logs():
    """Endpoint to get automation logs."""
    try:
        return jsonify({'logs': automation_logs})
    
    except Exception as e:
        logger.error(f"Error getting job logs: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload-cv', methods=['POST'])
def upload_cv():
    """Endpoint to upload a CV for automation."""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Check file extension
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ['.pdf', '.docx']:
            return jsonify({'error': 'File must be PDF or DOCX format'}), 400
        
        # Save the file
        # In a real application, save this to a persistent storage
        upload_dir = os.path.join(tempfile.gettempdir(), 'job_automation')
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, 'resume' + file_ext)
        file.save(file_path)
        
        return jsonify({'success': True, 'message': 'CV uploaded successfully', 'file_path': file_path})
    
    except Exception as e:
        logger.error(f"Error uploading CV: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
