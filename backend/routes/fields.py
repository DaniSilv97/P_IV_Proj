from flask import Blueprint, request, session, jsonify
import json
from services.weather_service import get_current_weather, get_weather_forecast
from services.crop_service import add_crop_recommendation_to_field

fields_bp = Blueprint('fields', __name__)

@fields_bp.route('/fields', methods=['GET'])
def get_fields():
  """Get all fields for the logged-in user, enriched with weather data."""
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

  enriched_fields = []
  for field in user_fields:
    lat = field.get('latitude')
    lon = field.get('longitude')
    weather = get_current_weather(lat, lon)
    field['weather'] = weather
    enriched_fields.append(field)

  return jsonify({"fields": enriched_fields})

@fields_bp.route('/fields/<field_id>', methods=['GET'])
def get_field(field_id):
  """Get a specific field by ID for the logged-in user, including weather forecast and crop recommendation."""
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

  lat = field.get('latitude')
  lon = field.get('longitude')
  weather = get_weather_forecast(lat, lon)
  field['weather'] = weather
  field = add_crop_recommendation_to_field(field)
  
  return jsonify({"field": field})

@fields_bp.route('/fields/<field_id>', methods=['DELETE'])
def delete_field(field_id):
  """Delete a field by ID for the logged-in user."""
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

@fields_bp.route('/fields/create', methods=['POST'])
def create_field():
  """Create a new field for the logged-in user."""
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
    lat = new_field.get('latitude')
    lon = new_field.get('longitude')
    weather = get_current_weather(lat, lon)
    new_field["weather"] = weather

    return jsonify({
      "message": "Field created successfully",
      "field": new_field
    }), 201
  except Exception as e:
    return jsonify({"error": "Failed to create field"}), 500