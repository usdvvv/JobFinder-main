
#!/bin/bash

# Install required packages
pip install flask flask-cors pdfminer.six python-docx selenium requests

# Start the Flask server
python api.py
