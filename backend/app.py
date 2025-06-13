# region Imports and Setup
from flask import Flask, request, session, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
import os
import json
import requests
from dotenv import load_dotenv
from threading import Thread
import time
from datetime import datetime
from collections import defaultdict
load_dotenv()
# endregion

# region Flask App Initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')
app.config['SESSION_TYPE'] = 'filesystem'

CORS(app, origins=["http://localhost:5173"], supports_credentials=True, methods=["GET", "POST", "DELETE"])

socketio = SocketIO(
  app,
  cors_allowed_origins="http://localhost:5173",
  manage_session=True,
  logger=True,
  engineio_logger=True
)

connected_users = {}
# endregion

# region Routes: General
@app.route('/')
def index():
    """
    Root endpoint to check if the Flask backend is running.
    """
    return jsonify({"message": "Flask backend is running!", "status": "success"})
# endregion

# region Routes: Authentication
@app.route('/api/login', methods=['POST'])
def login():
    """
    Login endpoint for user authentication.
    """
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
    """
    Logout endpoint to clear user session.
    """
    user_id = session.get('user_id')
    if user_id and user_id in connected_users:
        del connected_users[user_id]

    session.clear()
    return jsonify({"message": "Logout successful"})

@app.route('/api/session', methods=['GET'])
def get_session():
    """
    Get current session information.
    """
    if session.get('logged_in'):
        return jsonify({
            "logged_in": True,
            "user_id": session.get('user_id'),
            "username": session.get('username')
        })
    else:
        return jsonify({"logged_in": False}), 401
# endregion

# region Routes: Fields CRUD and Weather
@app.route('/api/fields', methods=['GET'])
def get_fields():
    """
    Get all fields for the logged-in user, enriched with weather data.
    """
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

@app.route('/api/fields/<field_id>', methods=['GET'])
def get_field(field_id):
    """
    Get a specific field by ID for the logged-in user, including weather forecast and crop recommendation.
    """
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

    field = next((f for f in fields if f.get('field_id') == field_id and f.get('user_id') == user_id), None)

    if not field:
        return jsonify({"error": "Field not found"}), 404

    weather_api_key = os.environ.get('OPENWEATHER_API_KEY')
    lat = field.get('latitude')
    lon = field.get('longitude')
    weather = {}

    if weather_api_key and lat and lon:
        try:
            weather_url = (f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&exclude=minutely,alerts&units=metric&appid={weather_api_key}")

            response = requests.get(weather_url)
            if response.ok:
                data = response.json()

                forecast_by_day = defaultdict(list)
                for entry in data.get("list", []):
                    date_str = entry["dt_txt"].split(" ")[0]
                    forecast_by_day[date_str].append(entry)

                daily = []
                num_days = 5
                for date, entries in list(forecast_by_day.items())[:num_days]:
                    segments = []
                    for e in entries:
                        segments.append({
                            "time": e["dt_txt"],
                            "temperature": e["main"]["temp"],
                            "description": e["weather"][0]["description"],
                            "icon": e["weather"][0]["icon"],
                            "humidity": e["main"]["humidity"]
                        })

                    daily.append({
                        "date": date,
                        "segments": segments
                    })
                
                weather = daily

        except Exception as e:
            weather = {"error": "Failed to fetch weather forecast"}

    field['weather'] = weather
    field = add_crop_recommendation_to_field(field)
    return jsonify({"field": field})

@app.route('/api/fields/<field_id>', methods=['DELETE'])
def delete_field(field_id):
    """
    Delete a field by ID for the logged-in user.
    """
    if not session.get('logged_in'):
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not found in session"}), 401
    if not field_id:
        return jsonify({"error": "Field ID is required"}), 400
    
    print(f"Deleting field with ID: {field_id} for user ID: {user_id}")
    try:
        with open('./data/fields.json', 'r') as f:
            fields_data = json.load(f)
            fields = fields_data.get('fields', [])
            updated_fields = [field for field in fields if not (field.get('field_id') == field_id and field.get('user_id') == user_id)]
        with open('./data/fields.json', 'w') as f:
            json.dump({"fields": updated_fields}, f, indent=2)
        return jsonify({"message": "Field deleted successfully"})
    except Exception as e:
        print(f"Error deleting field: {e}")
        return jsonify({"error": "Failed to delete field"}), 500    

@app.route('/api/fields/create', methods=['POST'])
def create_field():
    """
    Create a new field for the logged-in user.
    """
    if not session.get('logged_in'):
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not found in session"}), 401
    
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify({"error": "Name required"}), 400
    if not data.get('latitude') or not data.get('longitude'):
        return jsonify({"error": "Latitude and longitude are required"}), 400
    if not data.get('crop_id'):
        return jsonify({"error": "Crop ID is required"}), 400

    try:
        with open('./data/fields.json', 'r') as f:
            fields_data = json.load(f)
            fields = fields_data.get('fields', [])
            if fields:
                last_id = max(int(field.get('field_id', 0)) for field in fields)
            else:
                last_id = 0
    except Exception:
        last_id = 0

    new_field = {
        "field_id": str(last_id + 1),
        "name": data.get('name'),
        "crop_id": str(data.get('crop_id', None)),
        "user_id": user_id,
        "latitude": data.get('latitude'),
        "longitude": data.get('longitude')
    }

    try:
        with open('./data/fields.json', 'r') as f:
            fields_data = json.load(f)
            fields = fields_data.get('fields', [])
            fields.append(new_field)
        with open('./data/fields.json', 'w') as f:
            json.dump({"fields": fields}, f, indent=2)

        # Add weather data to the newly created field
        weather = {}
        weather_api_key = os.environ.get('OPENWEATHER_API_KEY')
        lat = new_field.get('latitude')
        lon = new_field.get('longitude')
        if weather_api_key and lat and lon:
            try:
                url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={weather_api_key}"
                response = requests.get(url)
                if response.ok:
                    data = response.json()
                    weather = {
                        "temperature": data.get("main", {}).get("temp"),
                        "description": data.get("weather", [{}])[0].get("description"),
                        "icon": data.get("weather", [{}])[0].get("icon"),
                        "humidity": data.get("main", {}).get("humidity"),
                    }
            except Exception:
                weather = {"error": "Failed to fetch weather"}

        new_field["weather"] = weather

        return jsonify({
            "message": "Field created successfully",
            "field": new_field
        }), 201
    except Exception as e:
        return jsonify({"error": "Failed to create field"}), 500
# endregion

# region Crop Recommendation Logic
def get_crop_recommendation(crop_id, weather_data):
    """
    Get crop recommendation based on crop type and weather forecast
    """
    # Crop mapping
    crop_types = {
        "1": "Wheat",
        "2": "Carrot", 
        "3": "Basil",
        "4": "Spinach"
    }
    
    if crop_id not in crop_types:
        return {"error": "Invalid crop ID"}
    
    if not weather_data or isinstance(weather_data, dict) and "error" in weather_data:
        return {"error": "Weather data unavailable"}
    
    crop_name = crop_types[crop_id]
    
    # Analyze weather patterns over next few days
    weather_analysis = analyze_weather_patterns(weather_data)
    
    # Get recommendation based on crop type and weather
    recommendation = get_recommendation_logic(crop_id, crop_name, weather_analysis)
    
    return recommendation

def analyze_weather_patterns(weather_data):
    """
    Analyze weather patterns from forecast data.
    """
    total_temp = 0
    total_humidity = 0
    temp_count = 0
    humidity_count = 0
    rain_days = 0
    hot_days = 0
    cold_days = 0
    
    for day in weather_data:
        daily_temps = []
        daily_humidity = []
        has_rain = False
        
        for segment in day.get("segments", []):
            temp = segment.get("temperature", 0)
            humidity = segment.get("humidity", 0)
            description = segment.get("description", "").lower()
            
            daily_temps.append(temp)
            daily_humidity.append(humidity)
            
            # Check for rain indicators
            if any(word in description for word in ["rain", "drizzle", "shower", "storm"]):
                has_rain = True
        
        if daily_temps:
            avg_daily_temp = sum(daily_temps) / len(daily_temps)
            avg_daily_humidity = sum(daily_humidity) / len(daily_humidity)
            
            total_temp += avg_daily_temp
            total_humidity += avg_daily_humidity
            temp_count += 1
            humidity_count += 1
            
            if avg_daily_temp > 25:  # Hot day
                hot_days += 1
            elif avg_daily_temp < 10:  # Cold day
                cold_days += 1
                
            if has_rain:
                rain_days += 1
    
    return {
        "avg_temperature": total_temp / temp_count if temp_count > 0 else 0,
        "avg_humidity": total_humidity / humidity_count if humidity_count > 0 else 0,
        "rain_days": rain_days,
        "hot_days": hot_days,
        "cold_days": cold_days,
        "total_days": len(weather_data)
    }

def get_recommendation_logic(crop_id, crop_name, weather_analysis):
    """
    Generate recommendation based on crop type and weather analysis.
    """
    avg_temp = weather_analysis["avg_temperature"]
    avg_humidity = weather_analysis["avg_humidity"]
    rain_days = weather_analysis["rain_days"]
    hot_days = weather_analysis["hot_days"]
    cold_days = weather_analysis["cold_days"]
    total_days = weather_analysis["total_days"]
    
    # Wheat recommendations
    if crop_id == "1":  # Wheat
        if cold_days >= 2:
            return {
                "action": "protect",
                "reasoning": f"Cold weather expected ({cold_days} cold days). Consider covering wheat to protect from frost.",
                "priority": "high"
            }
        elif rain_days >= 3:
            return {
                "action": "monitor",
                "reasoning": f"High rainfall expected ({rain_days}/{total_days} days). Monitor for fungal diseases and ensure proper drainage.",
                "priority": "medium"
            }
        elif avg_humidity < 40 and rain_days == 0:
            return {
                "action": "water",
                "reasoning": f"Low humidity ({avg_humidity:.1f}%) and no rain expected. Wheat needs consistent moisture.",
                "priority": "high"
            }
        else:
            return {
                "action": "monitor",
                "reasoning": "Weather conditions are suitable for wheat. Continue regular monitoring.",
                "priority": "low"
            }
    
    # Carrot recommendations  
    elif crop_id == "2":  # Carrot
        if rain_days >= 3:
            return {
                "action": "harvest",
                "reasoning": f"Heavy rain expected ({rain_days}/{total_days} days). Harvest mature carrots to prevent splitting and rot.",
                "priority": "high"
            }
        elif avg_temp > 28:
            return {
                "action": "water",
                "reasoning": f"High temperatures expected ({avg_temp:.1f}°C). Increase watering to prevent carrots from becoming woody.",
                "priority": "medium"
            }
        elif avg_humidity < 50 and rain_days <= 1:
            return {
                "action": "water",
                "reasoning": f"Low humidity ({avg_humidity:.1f}%) and minimal rain. Carrots need consistent soil moisture.",
                "priority": "medium"
            }
        else:
            return {
                "action": "monitor",
                "reasoning": "Good growing conditions for carrots. Maintain regular care routine.",
                "priority": "low"
            }
    
    # Basil recommendations
    elif crop_id == "3":  # Basil
        if cold_days >= 1:
            return {
                "action": "harvest",
                "reasoning": f"Cold weather approaching ({cold_days} cold days). Harvest basil before frost damage occurs.",
                "priority": "urgent"
            }
        elif rain_days >= 3:
            return {
                "action": "protect",
                "reasoning": f"Heavy rain expected ({rain_days}/{total_days} days). Protect basil from overwatering and fungal issues.",
                "priority": "high"
            }
        elif hot_days >= 2 and avg_humidity < 60:
            return {
                "action": "water",
                "reasoning": f"Hot, dry conditions expected. Basil needs frequent watering and possible shade protection.",
                "priority": "medium"
            }
        elif avg_humidity < 50 and rain_days == 0:
            return {
                "action": "water",
                "reasoning": f"Low humidity ({avg_humidity:.1f}%) and no rain. Basil requires consistent moisture.",
                "priority": "medium"
            }
        else:
            return {
                "action": "monitor",
                "reasoning": "Favorable conditions for basil growth. Continue regular care.",
                "priority": "low"
            }
    
    # Spinach recommendations
    elif crop_id == "4":  # Spinach
        if hot_days >= 2:
            return {
                "action": "harvest",
                "reasoning": f"Hot weather expected ({hot_days} hot days). Harvest spinach before it bolts in high temperatures.",
                "priority": "high"
            }
        elif avg_temp > 24:
            return {
                "action": "harvest",
                "reasoning": f"Temperature rising to {avg_temp:.1f}°C. Spinach quality deteriorates in warm weather.",
                "priority": "medium"
            }
        elif rain_days >= 4:
            return {
                "action": "monitor",
                "reasoning": f"Heavy rain expected ({rain_days}/{total_days} days). Monitor for leaf spot and ensure good air circulation.",
                "priority": "medium"
            }
        elif avg_humidity < 45 and rain_days <= 1:
            return {
                "action": "water",
                "reasoning": f"Low humidity ({avg_humidity:.1f}%) and minimal rain. Spinach needs consistent soil moisture.",
                "priority": "medium"
            }
        else:
            return {
                "action": "monitor",
                "reasoning": "Cool weather is ideal for spinach. Continue normal care routine.",
                "priority": "low"
            }

def add_crop_recommendation_to_field(field_data):
    """
    Add crop recommendation to field data.
    """
    crop_id = field_data.get('crop_id')
    weather_data = field_data.get('weather', [])
    
    if crop_id and weather_data:
        recommendation = get_crop_recommendation(crop_id, weather_data)
        field_data['recommendation'] = recommendation
    else:
        field_data['recommendation'] = {
            "action": "monitor",
            "reasoning": "Insufficient data for specific recommendation",
            "priority": "low"
        }
    
    return field_data
# endregion

# region SocketIO: Weather Updates
def send_weather_periodically(sid):
    """
    Periodically send weather updates to a connected SocketIO client.
    """
    weather_api_key = os.environ.get('OPENWEATHER_API_KEY')
    lat = 41.15788815839542
    lon = -8.62913041410896

    while sid in connected_users:
        # For testing purposes, you can use a static weather object
        weather = {
            "temperature": 20,
            "description": 'broken clouds',
            "icon": '04n',
            "humidity": 94,
            "city": 'Porto'
        }
        socketio.emit('weather_update', weather, room=sid)
        time.sleep(60)

@socketio.on('connect')
def handle_connect():
    """
    Handle new SocketIO client connection.
    Starts a thread to send weather updates periodically.
    """
    sid = request.sid
    print(f'Client connected: {sid}')
    connected_users[sid] = True
    join_room(sid)
    thread = Thread(target=send_weather_periodically, args=(sid,))
    thread.daemon = True
    thread.start()

@socketio.on('disconnect')
def handle_disconnect():
    """
    Handle SocketIO client disconnection.
    Removes user from connected users.
    """
    sid = request.sid
    print(f'Client disconnected: {sid}')
    if sid in connected_users:
        del connected_users[sid]
    leave_room(sid)
# endregion

# region Main Entrypoint
if __name__ == '__main__':
    """
    Run the Flask app with SocketIO support.
    """
    socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
# endregion
