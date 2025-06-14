from flask import request
from flask_socketio import emit, join_room, leave_room
from threading import Thread
import requests
import time
import os

# Global variable to track connected users
connected_users = {}

def register_socketio_handlers(socketio):
  """Register all SocketIO event handlers."""
  
  @socketio.on('connect')
  def handle_connect():
    """Handle new SocketIO client connection. Starts a thread to send weather updates periodically."""
    sid = request.sid
    print(f'Client connected: {sid}')
    connected_users[sid] = True
    join_room(sid)
    thread = Thread(target=send_weather_periodically, args=(sid, socketio))
    thread.daemon = True
    thread.start()

  @socketio.on('disconnect')
  def handle_disconnect():
    """Handle SocketIO client disconnection. Removes user from connected users."""
    sid = request.sid
    print(f'Client disconnected: {sid}')
    if sid in connected_users:
        del connected_users[sid]
    leave_room(sid)

def send_weather_periodically(sid, socketio):
  """Periodically send weather updates to a connected SocketIO client."""
  weather_api_key = os.environ.get('OPENWEATHER_API_KEY')
  lat = 41.15788815839542
  lon = -8.62913041410896

  while sid in connected_users:
    weather = {}
    
    # if weather_api_key:
    #   try:
    #     url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={weather_api_key}"
    #     response = requests.get(url)
    #     if response.ok:
    #       data = response.json()
    #       weather = {
    #         "temperature": data.get("main", {}).get("temp"),
    #         "description": data.get("weather", [{}])[0].get("description"),
    #         "icon": data.get("weather", [{}])[0].get("icon"),
    #         "humidity": data.get("main", {}).get("humidity"),
    #         "city": data.get("name")
    #       }
    #     else:
    #       weather = {"error": "Weather API error"}
    #   except Exception as e:
    #     weather = {"error": "Failed to fetch weather"}
    # socketio.emit('weather_update', weather, room=sid)
    
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