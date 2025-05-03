
@echo off
ECHO Installing required Python packages...
pip install flask flask-cors pdfminer.six python-docx selenium requests

ECHO Starting the Flask server...
python api.py
