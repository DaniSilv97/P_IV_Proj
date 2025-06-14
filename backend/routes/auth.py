from flask import Blueprint, request, session, jsonify
import json

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
  """Login endpoint for user authentication."""
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
  session['user_id'] = user['user_id']
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

@auth_bp.route('/logout', methods=['POST'])
def logout():
  """Logout endpoint to clear user session."""
  from socketio_handlers import connected_users
  
  user_id = session.get('user_id')
  if user_id and user_id in connected_users:
    del connected_users[user_id]

  session.clear()
  return jsonify({"message": "Logout successful"})

@auth_bp.route('/session', methods=['GET'])
def get_session():
  """Get current session information."""
  if session.get('logged_in'):
    return jsonify({
      "logged_in": True,
      "user_id": session.get('user_id'),
      "username": session.get('username')
    })
  else:
    return jsonify({"logged_in": False}), 401