# Hospital Appointment System

A MERN stack application for managing hospital appointments, developed for the Advanced Web Development Frameworks exam (ITUE301).

## Prerequisites
- Node.js installed
- MongoDB installed (or Atlas connection string)

## Setup and Run

### 1. Frontend
The frontend is built with React (Vite).
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend
The backend is built with Express and connects to MongoDB.
```bash
cd backend
npm install
npm start
```

### 3. Environment Variables
Create a `.env` file in the root of the project with the following keys:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
*(An example `.env.example` file is provided)*

## MongoDB Setup
Connect the backend by providing a valid MongoDB URI in the `.env` file. Mongoose will automatically create the database based on the provided schemas (Patient, Doctor, Appointment) when operations are executed.
