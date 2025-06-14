import os
import requests
from collections import defaultdict

def get_current_weather(lat, lon):
  """Get current weather for given coordinates."""
  weather_api_key = os.environ.get('OPENWEATHER_API_KEY')
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

  return weather

def get_weather_forecast(lat, lon):
  """Get weather forecast for given coordinates."""
  weather_api_key = os.environ.get('OPENWEATHER_API_KEY')
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

  return weather