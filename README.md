# Electrocardiogram Machine Web Application

**Authored by**: Ishmael Abayateye, Data Engineer  
**Date**: July 26, 2025  
**NOTICE**: This README is authored by **Ishmael Abayateye**, a Data Engineer, to provide a comprehensive guide to the **Electrocardiogram Machine** web application, including its architecture, setup, setup, usage, and integration with an external AI Neural Model.

---

![ECG Machine Screenshot](https://github.com/ABAYA12/ECG-Machine/raw/main/image.png)
## Overview

The **Electrocardiogram Machine** is a modern, health-focused web application designed to visualize electrocardiogram (ECG) data, which measures the heart’s electrical activity of the heart. Users can upload ECG data files in (CSV or Excel format) or connect to an external AI Neural Model via API to generate interactive ECG line charts and key health metrics, such as heart rate, QRS duration, and arrhythmia count. The application features a professional, trustworthy user interface with a health-oriented color palette, ensuring accessibility and usability. A Node.js backend securely handles file processing and API integration, while the frontend provides an intuitive interface for data visualization.

### Purpose
- Enable users to visualize ECG data for diagnostic insights.
- Interface with an external AI Neural Model for data analysis.
- Provide a clean, accessible UI for health professionals and patients.
- Ensure secure and robust handling of sensitive ECG data.

### Key Features
- **Landing Page**: Introduces the app’s purpose with a hero section, feature highlights, and navigation.
- **Results Page**: Displays an interactive ECG line chart and metrics (heart rate, QRS duration, arrhythmia count, summary).
- **File Upload**: Allows users to upload CSV/Excel files containing ECG data.
- **API Connection**: Enables integration with an external model via API credentials.
- **Health-Focused Design**: Uses calming colors (deep blue, green, teal) and Roboto font for professionalism.
- **Error Handling**: Prevents runtime errors with robust validation and logging.

---

## Architecture

The application follows a client-server architecture with a frontend for user interaction and a Node.js backend for file processing and API communication.

### Tech Stack
#### Frontend
- **HTML**: Semantic structure for landing page, results page, and modals.
- **CSS (Tailwind CSS)**: Utility-first styling via CDN (`https://cdn.tailwindcss.com`).
- **JavaScript**: Handles interactivity, page navigation, modals, and chart rendering.
- **Chart.js**: Version 4.4.3 (CDN: `https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js`) for ECG line charts.
- **Font**: Roboto (`font-family: 'Roboto', sans-serif`) for clarity.

#### Backend
- **Node.js**: Latest LTS version, runtime for server-side logic.
- **Express.js**: Framework for routing and API endpoints.
- **Dependencies**:
  - `multer`: Handles file uploads.
  - `csv-parse`: Parses CSV files.
  - `xlsx`: Parses Excel files.
  - `axios`: Makes API requests to the external model.
  - `dotenv`: Manages environment variables (e.g., API keys).
  - `cors`: Enables CORS for frontend-backend communication.
- **Endpoints**:
  - `POST /upload`: Processes uploaded CSV/Excel files.
  - `POST /api-connect`: Forwards API requests to the external model.

#### External AI Neural Model
- Hosted on a remote server (not part of the app).
- Exposes an API endpoint (e.g., `https://model-api.com/analyze`) for ECG data analysis.
- Expected input: JSON data (e.g., time-voltage pairs) or uploaded files.
- Expected output: JSON with `chart_data` (time and voltage arrays) and `metrics` (heart_rate, qrs_duration, arrhythmia_count).

### Project Structure

electrocardiogram-machine/├── server.js              # Node.js/Express backend├── package.json           # Node.js dependencies and scripts├── .env.example           # Example environment variables├── public/                # Static frontend files│   └── index.html         # Frontend (HTML, Tailwind, JavaScript, Chart.js)└── README.md              # This file

### Color Palette
- **Primary**: Deep blue (#1B4965) for trust and professionalism.
- **Secondary**: Green (#2E7D32) for health and vitality.
- **Accents**: Teal (#26A69A) for buttons and highlights.
- **Background**: Soft white (#F8FAFC), light gray (#E2E8F0) for a clean look.
- **Text**: Dark gray (#1F2937), white (#FFFFFF) for buttons.
- Designed for high contrast and WCAG 2.1 accessibility.

---

## Components

### Frontend
#### Landing Page
- **Header**: Fixed navigation bar (white, shadow) with logo (“Electrocardiogram Machine”, 24px, deep blue) and links (“Home”, “Upload Data”, “Connect API”, “About”).
- **Hero Section**:
  - Headline: “Visualize Your Heart’s Electrical Activity” (48px, bold, dark gray).
  - Subheadline: Describes ECG visualization for diagnostics (20px, gray, max-width 800px).
  - Buttons: “Upload ECG File” (deep blue) and “Connect API” (teal), with hover scale (1.05) and ARIA labels.
  - Background: Gradient (deep blue to soft white) with SVG ECG waveform animation (opacity 0.2, pulsing every 3s).
- **Features Section**: Three cards highlighting:
  - Precise ECG Analysis: Detects arrhythmias accurately.
  - Real-Time Insights: Immediate API-based visualization.
  - Intuitive Visuals: Interactive charts and metrics.
- **Footer**: Dark gray (#1F2937), white text, links (“Privacy Policy”, “Terms of Use”, “Contact Us”), copyright notice.

#### Results Page
- **Header**: Same as landing page, with “Back to Home” link.
- **Main Content**:
  - Grid layout (1 column on mobile, 3:1 ratio on desktop for chart vs. sidebar).
  - **Chart Section** (2/3 width):
    - Line chart (Chart.js) showing ECG signal (voltage in mV vs. time in seconds).
    - Sample data: 100 points simulating P-QRS-T waves (P: 0.2 mV, Q: -0.2 mV, R: 1.8 mV, S: -0.4 mV, T: 0.3 mV, baseline: 0 mV).
    - Chart options: Border color #1B4965, background rgba(27, 73, 101, 0.1), X-axis (Time, s), Y-axis (Voltage, mV, -1 to 2), tooltips, animation (1000ms, easeInOutQuad).
    - Controls: “Zoom In” (scale 1.2x), “Reset Zoom”, “Download Results” (placeholder).
  - **Info Panel** (1/3 width):
    - Cards: Heart Rate (68 BPM), QRS Duration (90 ms), Arrhythmia Count (2), Summary (stable rhythm, consult cardiologist).
    - Button: “Download Results” (teal, placeholder).

#### Modals
- **File Upload Modal**:
  - Input: Drag-and-drop for CSV/Excel (.csv, .xlsx).
  - Buttons: “Upload” (deep blue), “Cancel” (gray).
  - Sends file to `/upload` endpoint.
- **API Connection Modal**:
  - Inputs: API Key, Endpoint URL.
  - Buttons: “Connect” (deep blue), “Cancel” (gray).
  - Sends JSON to `/api-connect` endpoint.

### Backend
- **Endpoints**:
  - **POST /upload**:
    - Accepts file uploads via `multer`.
    - Validates file type (.csv, .xlsx).
    - Parses files using `csv-parse` or `xlsx`.
    - Sends data to the model’s API (simulated for demo).
    - Returns JSON: `{ chart_data: { time: [], voltage: [] }, metrics: { heart_rate, qrs_duration, arrhythmia_count } }`.
  - **POST /api-connect**:
    - Accepts JSON with `api_key`, `api_url`, and optional `data`.
    - Forwards request to the model’s API.
    - Returns model’s response.
- **Security**:
  - Uses `dotenv` to store API keys in `.env`.
  - Validates inputs to prevent malicious files or requests.
  - Enables CORS for frontend communication.

### External AI Neural Model
- **Role**: Analyzes ECG data (time-voltage pairs) to produce chart data and metrics.
- **Access**: Via API endpoint (e.g., `https://model-api.com/analyze`).
- **Input**: JSON (e.g., `{ data: [{ time: number, voltage: number }, ...] }`) or uploaded files.
- **Output**: JSON (e.g., `{ chart_data: { time: [], voltage: [] }, metrics: { heart_rate: number, qrs_duration: number, arrhythmia_count: number } }`).
- **Simulation**: For demo purposes, the backend simulates model output with hardcoded ECG data.

---

## Prerequisites

- **Node.js**: Latest LTS version (e.g., v18 or v20).
- **npm**: Included with Node.js.
- **Browser**: Chrome, Firefox, or Edge for testing.
- **Internet**: Required for Tailwind CSS and Chart.js CDNs.
- **Optional**: Git for version control.

---

## Installation

1. **Clone or Download the Project**:
   ```bash
   git clone <repository-url>
   cd electrocardiogram-machine

   Or unzip the downloaded project folder.

Install Backend Dependencies:
npm install

Installs express, multer, csv-parse, xlsx, axios, dotenv, and cors.

Configure Environment Variables:

Copy .env.example to .env:cp .env.example .env


Edit .env with the model’s API details:MODEL_API_KEY=your-model-api-key
MODEL_API_URL=https://model-api.com/analyze
PORT=3000




Start the Backend:
node server.js

The server runs on http://localhost:3000.

Access the Frontend:

The backend serves public/index.html at http://localhost:3000.
Alternatively, serve the public folder separately:cd public
python -m http.server 8080


Access at http://localhost:8080.


Directory Setup:

Ensure the uploads/ folder exists for temporary file storage (created by multer).
Verify .env is not committed to version control (add to .gitignore).




Usage
Accessing the Application

Open http://localhost:3000 (or http://localhost:8080 if serving frontend separately).
The landing page loads with navigation, hero section, and features.

Uploading ECG Data

Click “Upload ECG File” to open the file upload modal.
Select a CSV or Excel file (.csv, .xlsx) with time-voltage pairs (e.g., columns time, voltage).
Click “Upload” to send the file to the /upload endpoint.
On success, the results page displays the ECG chart and metrics.
On error, an alert shows (e.g., “Invalid file format”).

Connecting to the Model API

Click “Connect API” to open the API modal.
Enter the API Key and Endpoint URL.
Click “Connect” to send a request to the /api-connect endpoint.
On success, the results page displays the ECG chart and metrics.
On error, an alert shows (e.g., “Missing API key”).

Viewing Results

Chart: Interactive line chart showing ECG signal (voltage vs. time).
Metrics: Heart rate, QRS duration, arrhythmia count, and summary in sidebar cards.
Controls:
“Zoom In”: Scales chart by 1.2x.
“Reset Zoom”: Restores default view.
“Download Results”: Placeholder (not implemented in demo).


Click “Back to Home” to return to the landing page.

Troubleshooting

Script Error: Check browser console (F12) for errors. Ensure CDNs are accessible and DOMContentLoaded is used.
Backend Errors: Verify .env configuration and model API availability.
File Issues: Ensure uploaded files have correct format (e.g., columns time, voltage).


Integration with External AI Neural Model
Model Requirements

Endpoint: REST API (e.g., https://model-api.com/analyze).
Authentication: Bearer token or API key.
Input: JSON with ECG data (e.g., { data: [{ time: number, voltage: number }, ...] }) or file upload.
Output: JSON with:
chart_data: { time: number[], voltage: number[] }
metrics: { heart_rate: number, qrs_duration: number, arrhythmia_count: number }



Backend Integration

File Upload:
The /upload endpoint parses CSV/Excel files into JSON.
Sends parsed data to the model’s API using axios.
Example request:POST https://model-api.com/analyze
Headers: { Authorization: "Bearer <MODEL_API_KEY>" }
Body: { data: [{ time: 0.02, voltage: 0.2 }, ...] }


Example response:{
  "chart_data": { "time": [0.00, 0.02, ...], "voltage": [0.2, -0.2, 1.8, ...] },
  "metrics": { "heart_rate": 68, "qrs_duration": 90, "arrhythmia_count": 2 }
}




API Connection:
The /api-connect endpoint forwards user-provided API key and URL to the model.
Handles authentication and data transmission securely.



Frontend Integration

Sends requests to backend endpoints (/upload, /api-connect).
Parses model response to render Chart.js line chart and update metrics.
Example JavaScript:async function handleFileUpload() {
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  const response = await fetch('/upload', { method: 'POST', body: formData });
  const result = await response.json();
  renderChart(result.chart_data, result.metrics);
}



Simulated Data

For demo purposes, the backend simulates model output:
Chart data: 100-point P-QRS-T waveform (P: 0.2 mV, Q: -0.2 mV, R: 1.8 mV, S: -0.4 mV, T: 0.3 mV).
Metrics: { heart_rate: 68, qrs_duration: 90, arrhythmia_count: 2 }.


Replace with real model output by updating server.js with actual API calls.


Error Handling
Frontend

DOMContentLoaded: Ensures DOM is ready before JavaScript execution.
Try-Catch: Wraps all functions (page switching, modals, file upload, API, chart rendering).
Input Validation: Checks for valid file types (.csv, .xlsx) and API inputs.
Alerts: User-friendly messages for errors (e.g., “Invalid file format”).
Console Logs: Descriptive logs (e.g., “Chart rendered successfully”).

Backend

File Validation: Rejects invalid file types (400 Bad Request).
API Validation: Ensures API key and URL are provided (400 Bad Request).
Error Responses: Returns 500 for server errors with detailed logs.
File Cleanup: Deletes temporary uploaded files to prevent storage issues.

Common Issues

Script Error: Caused by CDN failures or DOM issues. Solution: Test with a local server (python -m http.server) and check console logs.
CORS Errors: Ensured by cors middleware in backend.
API Failures: Verify .env settings and model API availability.


Accessibility

ARIA Labels: Added to buttons, inputs, and chart canvas for screen readers.
High Contrast: Colors meet WCAG 2.1 standards (e.g., dark gray text on soft white).
Keyboard Navigation: All interactive elements (buttons, links, inputs) are keyboard-accessible.
Semantic HTML: Uses <nav>, <main>, <footer> for structure.


Responsive Design

Mobile: Single-column layout for screens <768px.
Desktop: 3:1 grid for chart and info panel.
Chart: Resizes within a max-width of 800px.
Navigation: Links stack vertically on mobile (optional hamburger menu not implemented).


Deployment

Frontend: Host on Netlify, Vercel, or a static server (e.g., python -m http.server).
Backend: Deploy on Heroku, AWS, or DigitalOcean.
Set environment variables in hosting platform.
Ensure uploads/ folder is writable.


Example:
Netlify: Drag-and-drop public/ folder.
Heroku: Push project with git push heroku main, set .env variables.




Future Enhancements

Real Model Integration: Replace simulated data with actual model API calls (requires API specs).
Download Feature: Implement PNG/PDF export using html2canvas or jsPDF.
Real-Time Streaming: Use WebSocket for live ECG data (if model supports).
Authentication: Add user login for secure access.
Advanced Metrics: Include PR interval, ST elevation, or other ECG metrics.


Contact
For support or inquiries, contact Ishmael Abayateye, Data Engineer, at [insert contact information].

End of README```
