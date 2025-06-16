from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import os
from dotenv import load_dotenv

from routes.auth import auth_bp
from routes.fields import fields_bp
from socketio_handlers import register_socketio_handlers

load_dotenv()

def create_app():
  """Create and configure the Flask application."""
  app = Flask(__name__)
  app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')
  app.config['SESSION_TYPE'] = 'filesystem'

  # Configure CORS
  CORS(app, origins=["http://localhost:5173"], supports_credentials=True, methods=["GET", "POST", "DELETE"])

  # Register blueprints
  app.register_blueprint(auth_bp, url_prefix='/api')
  app.register_blueprint(fields_bp, url_prefix='/api')

  # Basic route
  @app.route('/')
  def index():
    """Root endpoint to check if the Flask backend is running."""
    return {"message": "Flask backend is running!", "status": "success"}

  return app

def create_socketio(app):
  """Create and configure SocketIO."""
  socketio = SocketIO(
    app,
    cors_allowed_origins="http://localhost:5173",
    manage_session=True,
    logger=True,
    engineio_logger=True
  )
  
  # Register SocketIO handlers
  register_socketio_handlers(socketio)
  
  return socketio

if __name__ == '__main__':
  app = create_app()
  socketio = create_socketio(app)
  socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)