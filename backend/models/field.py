from dataclasses import dataclass
from typing import Optional, Dict, Any

@dataclass
class Field:
  """Field model for representing field data."""
  field_id: str
  name: str
  crop_id: str
  user_id: str
  latitude: float
  longitude: float
  weather: Optional[Dict[str, Any]] = None
  recommendation: Optional[Dict[str, Any]] = None
  
  @classmethod
  def from_dict(cls, data: dict) -> 'Field':
    """Create a Field instance from a dictionary."""
    return cls(
      field_id=data.get('field_id'),
      name=data.get('name'),
      crop_id=data.get('crop_id'),
      user_id=data.get('user_id'),
      latitude=float(data.get('latitude', 0)),
      longitude=float(data.get('longitude', 0)),
      weather=data.get('weather'),
      recommendation=data.get('recommendation')
    )
  
  def to_dict(self) -> dict:
    """Convert Field instance to dictionary."""
    result = {
      'field_id': self.field_id,
      'name': self.name,
      'crop_id': self.crop_id,
      'user_id': self.user_id,
      'latitude': self.latitude,
      'longitude': self.longitude
    }
    
    # Only include weather and recommendation if they exist
    if self.weather is not None:
      result['weather'] = self.weather
    if self.recommendation is not None:
      result['recommendation'] = self.recommendation
        
    return result
  
  def to_storage_dict(self) -> dict:
    """Convert Field instance to dictionary for storage (without weather/recommendation)."""
    return {
      'field_id': self.field_id,
      'name': self.name,
      'crop_id': self.crop_id,
      'user_id': self.user_id,
      'latitude': self.latitude,
      'longitude': self.longitude
    }
  
  def get_coordinates(self) -> tuple:
    """Get latitude and longitude as a tuple."""
    return (self.latitude, self.longitude)
  
  def get_crop_name(self) -> str:
    """Get the crop name based on crop_id."""
    crop_mapping = {
      "1": "Wheat",
      "2": "Carrot",
      "3": "Basil",
      "4": "Spinach"
    }
    return crop_mapping.get(self.crop_id, "Unknown")
  
  def set_weather(self, weather_data: Dict[str, Any]) -> None:
    """Set weather data for the field."""
    self.weather = weather_data
  
  def set_recommendation(self, recommendation_data: Dict[str, Any]) -> None:
    """Set recommendation data for the field."""
    self.recommendation = recommendation_data
  
  def __str__(self) -> str:
    return f"Field(id={self.field_id}, name={self.name}, crop={self.get_crop_name()}, user_id={self.user_id})"