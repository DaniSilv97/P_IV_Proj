import pytest
import json
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with client.session_transaction() as sess:
            sess['logged_in'] = True
            sess['user_id'] = '1'
        yield client

def test_index_route(client):
    response = client.get('/')
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "Flask backend is running!"

def test_login_missing_fields(client):
    response = client.post('/api/login', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data

def test_get_session_logged_in(client):
    response = client.get('/api/session')
    assert response.status_code == 200
    data = response.get_json()
    assert data['logged_in'] is True

def test_create_field_missing_name(client):
    response = client.post('/api/fields/create', json={
        "latitude": 41.1,
        "longitude": -8.6,
        "crop_id": "1"
    })
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data and "Name required" in data['error']

def test_get_fields_unauthorized():
    app.config['TESTING'] = True
    with app.test_client() as client:
        response = client.get('/api/fields')
        assert response.status_code == 401
        data = response.get_json()
        assert "error" in data
