# 🌱 SmartSprout Solutions

A web application for managing agricultural fields with real-time weather data and intelligent crop recommendations.

---

## 📁 Project Structure

```
/project-root
│
├── frontend/         # Frontend React application
├── backend/          # Backend Flask application
├── README.md
```

---

## 🚀 Getting Started

### 1. **Frontend Setup** (`/frontend`)

```bash
cd frontend
npm install
npm run dev
```

> Starts the frontend on `http://localhost:5173`

---

### 2. **Backend Setup** (`/backend`)

```bash
cd ..
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

> Starts the Flask server on `http://localhost:5000`

---

### 3. **Environment Variables**

Copy the `.env.example` to `.env` file in the `backend/` directory:

```
OPENWEATHER_API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
```

---

### 4. **Run Tests (Pytest)**

From the `backend/` directory:

```bash
pytest
```

> Runs unit tests to validate backend logic.

---

## 🧪 Features

* User authentication (session-based)
* Field management (CRUD)
* Real-time weather updates (WebSocket)
* Smart crop recommendations based on weather forecast

---

## ✅ Requirements

* Python 3.9+
* Node.js 18+
* OpenWeather API key

---

## Accounts
* check `backend\data\users.json`
