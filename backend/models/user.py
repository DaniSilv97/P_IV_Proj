from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
  """User model for representing user data."""
  user_id: str
  name: str
  surname: str
  email: str
  password: str
  
  @classmethod
  def from_dict(cls, data: dict) -> 'User':
    """Create a User instance from a dictionary."""
    return cls(
      user_id=data.get('user_id'),
      name=data.get('name'),
      surname=data.get('surname'),
      email=data.get('email'),
      password=data.get('password')
    )
  
  def to_dict(self) -> dict:
    """Convert User instance to dictionary."""
    return {
      'user_id': self.user_id,
      'name': self.name,
      'surname': self.surname,
      'email': self.email,
      'password': self.password
    }
  
  def to_safe_dict(self) -> dict:
    """Convert User instance to dictionary without password."""
    return {
      'user_id': self.user_id,
      'name': self.name,
      'surname': self.surname,
      'email': self.email
    }
  
  def validate_password(self, password: str) -> bool:
    """Validate password against stored password."""
    return self.password == password
  
  def __str__(self) -> str:
    return f"User(id={self.user_id}, name={self.name} {self.surname}, email={self.email})"