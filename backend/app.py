from flask import Flask, request, session, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
import os
from datetime import datetime
import uuid
import json
import requests
from dotenv import load_dotenv
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')
app.config['SESSION_TYPE'] = 'filesystem'

# Enable CORS for React frontend at http://localhost:5173
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Initialize SocketIO with CORS support for the React frontend
socketio = SocketIO(
  app,
  cors_allowed_origins="http://localhost:5173",
  manage_session=True,
  logger=True,
  engineio_logger=True
)

# Store connected users (for production, use Redis or a database)
connected_users = {}

@app.route('/')
def index():
  return jsonify({"message": "Flask backend is running!", "status": "success"})

@app.route('/api/login', methods=['POST'])
def login():
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')

  if not email or not password:
    return jsonify({"error": "Email and password required"}), 400

  # Load users from JSON file
  try:
    with open('./data/users.json', 'r') as f:
      users_data = json.load(f)
      users = users_data.get('users', [])
  except Exception as e:
    return jsonify({"error": "Failed to load users data"}), 500

  # Check if user exists and password matches
  user = next((user for user in users if user['email'].lower() == email.lower() and user.get('password') == password), None)

  if not user:
    return jsonify({"error": "Invalid email or password"}), 401

  # Create session
  session['user_id'] =  user['user_id']
  session['email'] = user['email']
  session['name'] = user.get('name')
  session['surname'] = user.get('surname')
  session['logged_in'] = True

  return jsonify({
    "message": "Login successful",
    "user_id": session['user_id'],
    "email": user['email'],
    "name": user.get('name'),
    "surname": user.get('surname')
  })

@app.route('/api/logout', methods=['POST'])
def logout():
  user_id = session.get('user_id')
  if user_id and user_id in connected_users:
    del connected_users[user_id]

  session.clear()
  return jsonify({"message": "Logout successful"})

@app.route('/api/session', methods=['GET'])
def get_session():
  if session.get('logged_in'):
    return jsonify({
      "logged_in": True,
      "user_id": session.get('user_id'),
      "username": session.get('username')
    })
  else:
    return jsonify({"logged_in": False}), 401

@app.route('/api/fields', methods=['GET'])
def get_fields():
  if not session.get('logged_in'):
    return jsonify({"error": "Unauthorized"}), 401

  user_id = session.get('user_id')
  if not user_id:
    return jsonify({"error": "User ID not found in session"}), 401

  try:
    with open('./data/fields.json', 'r') as f:
      fields_data = json.load(f)
      fields = fields_data.get('fields', [])
  except Exception as e:
    return jsonify({"error": "Failed to load fields data"}), 500

  user_fields = [field for field in fields if field.get('user_id') == user_id]
  weather_api_key = os.environ.get('OPENWEATHER_API_KEY')

  enriched_fields = []
  for field in user_fields:
    lat = field.get('latitude')
    lon = field.get('longitude')
    weather = {}

    if weather_api_key and lat and lon:
      try:
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={weather_api_key}"
        response = requests.get(weather_url)
        if response.ok:
          data = response.json()
          weather = {
            "temperature": data.get("main", {}).get("temp"),
            "description": data.get("weather", [{}])[0].get("description"),
            "icon": data.get("weather", [{}])[0].get("icon"),
            "humidity": data.get("main", {}).get("humidity"),
          }
      except Exception as e:
        weather = {"error": "Failed to fetch weather"}

    field['weather'] = weather
    enriched_fields.append(field)

  return jsonify({"fields": enriched_fields})


if __name__ == '__main__':
  # Run the Flask app with SocketIO support
  socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
