# HistoriAI
Interactive Historical Data Explorer


HistoriAI: Interactive Historical Data Explorer
HistoriAI is a web application that enables users to explore historical datasets, such as trade routes and conflicts, through natural language queries. It delivers AI-generated narratives alongside interactive timeline and map visualizations, making history accessible and engaging. The project leverages MongoDB Atlas for semantic search, Google Cloud AI for narrative generation, and React + Tailwind CSS for a modern, user-friendly interface.

🎯 Features

Natural Language Queries: Ask questions like “Show trade routes with conflict 1500–1700” to retrieve relevant historical events.
Interactive Visualizations: Display results on a timeline (Vis.js) and map (Leaflet).
AI-Driven Narratives: Google Cloud’s AI generates storytelling-style explanations.
Scalable Architecture: Hosted on Google Cloud Run with MongoDB Atlas for data storage and vector search.

🛠️ Tech Stack

Backend: Node.js, Express, MongoDB Atlas (with vector search), Google Cloud Vertex AI/Gemini API
Frontend: React, Tailwind CSS, Vis.js (timeline), React-Leaflet (map)
Deployment: Google Cloud Run (backend), Firebase Hosting (frontend)
Dataset: Historical trade routes and conflicts (sample provided)

🚀 Setup Instructions
Prerequisites

Node.js (v18+)
MongoDB Atlas account with vector search enabled
Google Cloud account with API key for Vertex AI/Gemini
Firebase CLI (for frontend deployment)
GitLab account (for open-source repo)

Local Setup

Clone the Repository:git clone <your-gitlab-repo-url>
cd HistoriAI


Backend Setup:
Navigate to backend/.
Install dependencies: npm install.
Copy .env.example to .env and add:MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/
GEMINI_API_KEY=your-google-api-key
PORT=8080


Ingest sample dataset: npm run ingest (uses backend/trade_routes.json).
Start server: npm start.


Frontend Setup:
Navigate to frontend/.
Install dependencies: npm install.
Start dev server: npm start (runs on http://localhost:5173).


MongoDB Atlas:
Create a cluster and enable vector search.
Create a vector index on the events collection’s embedding field:{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 768,
      "similarity": "cosine"
    }
  ]
}





Deployment

Backend (Google Cloud Run):
Build Docker image: docker build -t gcr.io/[PROJECT-ID]/historiai-backend .
Push to Google Container Registry: docker push gcr.io/[PROJECT-ID]/historiai-backend.
Deploy: gcloud run deploy historiai-backend --source . --region us-central1 --allow-unauthenticated.


Frontend (Firebase Hosting):
Initialize Firebase: firebase init hosting.
Build: npm run build.
Deploy: firebase deploy.



📊 Sample Dataset
A sample dataset of historical trade routes and conflicts is included in backend/trade_routes.json. It contains 20 events with fields for title, year, location (with coordinates), and summary. You can extend it with public datasets from sources like Harvard Dataverse or Uppsala Conflict Data Program.

