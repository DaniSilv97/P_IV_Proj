import json
import os
from typing import List, Optional
from models.user import User
from models.field import Field

class DataAccess:
  """Data access layer for handling JSON file operations."""
  
  def __init__(self, data_dir: str = './data'):
    self.data_dir = data_dir
    self.users_file = os.path.join(data_dir, 'users.json')
    self.fields_file = os.path.join(data_dir, 'fields.json')
  
  # User operations
  def get_all_users(self) -> List[User]:
    """Get all users from the JSON file."""
    try:
      with open(self.users_file, 'r') as f:
        data = json.load(f)
        return [User.from_dict(user_data) for user_data in data.get('users', [])]
    except FileNotFoundError:
      return []
    except Exception as e:
      raise Exception(f"Failed to load users: {str(e)}")
  
  def get_user_by_id(self, user_id: str) -> Optional[User]:
    """Get a user by their ID."""
    users = self.get_all_users()
    return next((user for user in users if user.user_id == user_id), None)
  
  def get_user_by_email(self, email: str) -> Optional[User]:
    """Get a user by their email address."""
    users = self.get_all_users()
    return next((user for user in users if user.email.lower() == email.lower()), None)
  
  def create_user(self, user: User) -> bool:
    """Create a new user."""
    try:
      users = self.get_all_users()
      
      # Check if user already exists
      if any(u.email.lower() == user.email.lower() for u in users):
        return False
      
      # Generate new user_id
      if users:
        max_id = max(int(u.user_id) for u in users)
        user.user_id = str(max_id + 1)
      else:
        user.user_id = "1"
      
      users.append(user)
      self._save_users(users)
      return True
    except Exception:
      return False
  
  def update_user(self, user: User) -> bool:
    """Update an existing user."""
    try:
      users = self.get_all_users()
      for i, u in enumerate(users):
        if u.user_id == user.user_id:
          users[i] = user
          self._save_users(users)
          return True
      return False
    except Exception:
      return False
  
  def delete_user(self, user_id: str) -> bool:
    """Delete a user by ID."""
    try:
      users = self.get_all_users()
      users = [u for u in users if u.user_id != user_id]
      self._save_users(users)
      return True
    except Exception:
      return False
  
  def _save_users(self, users: List[User]) -> None:
    """Save users list to JSON file."""
    data = {'users': [user.to_dict() for user in users]}
    with open(self.users_file, 'w') as f:
      json.dump(data, f, indent=2)
  
  # Field operations
  def get_all_fields(self) -> List[Field]:
    """Get all fields from the JSON file."""
    try:
      with open(self.fields_file, 'r') as f:
        data = json.load(f)
        return [Field.from_dict(field_data) for field_data in data.get('fields', [])]
    except FileNotFoundError:
      return []
    except Exception as e:
      raise Exception(f"Failed to load fields: {str(e)}")
  
  def get_field_by_id(self, field_id: str) -> Optional[Field]:
    """Get a field by its ID."""
    fields = self.get_all_fields()
    return next((field for field in fields if field.field_id == field_id), None)
  
  def get_fields_by_user_id(self, user_id: str) -> List[Field]:
    """Get all fields belonging to a specific user."""
    fields = self.get_all_fields()
    return [field for field in fields if field.user_id == user_id]

  def get_user_field_by_id(self, field_id: str, user_id: str) -> Optional[Field]:
    """Get a field by ID that belongs to a specific user."""
    field = self.get_field_by_id(field_id)
    if field and field.user_id == user_id:
      return field
    return None
  
  def create_field(self, field: Field) -> bool:
    """Create a new field."""
    try:
      fields = self.get_all_fields()
      
      # Generate new field_id
      if fields:
        max_id = max(int(f.field_id) for f in fields)
        field.field_id = str(max_id + 1)
      else:
        field.field_id = "1"
      
      fields.append(field)
      self._save_fields(fields)
      return True
    except Exception:
        return False
  
  def update_field(self, field: Field) -> bool:
    """Update an existing field."""
    try:
      fields = self.get_all_fields()
      for i, f in enumerate(fields):
        if f.field_id == field.field_id:
          fields[i] = field
          self._save_fields(fields)
          return True
      return False
    except Exception:
        return False
  
  def delete_field(self, field_id: str, user_id: str = None) -> bool:
    """Delete a field by ID, optionally restricted to a specific user."""
    try:
      fields = self.get_all_fields()
      if user_id:
        # Only delete if field belongs to the user
        fields = [f for f in fields if not (f.field_id == field_id and f.user_id == user_id)]
      else:
        # Delete any field with the given ID
        fields = [f for f in fields if f.field_id != field_id]
      
      self._save_fields(fields)
      return True
    except Exception:
      return False
  
  def _save_fields(self, fields: List[Field]) -> None:
    """Save fields list to JSON file."""
    data = {'fields': [field.to_storage_dict() for field in fields]}
    with open(self.fields_file, 'w') as f:
      json.dump(data, f, indent=2)

# Create a global instance for easy import
data_access = DataAccess()