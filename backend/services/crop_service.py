def get_crop_recommendation(crop_id, weather_data):
  """Get crop recommendation based on crop type and weather forecast."""
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
  """Analyze weather patterns from forecast data."""
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
  """Generate recommendation based on crop type and weather analysis."""
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
  """Add crop recommendation to field data."""
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