export interface Weather {
    "coord": {
      "lon": number,
      "lat": number
    },
    "weather": [
      {
        "id": number,
        "main": string,
        "description": string,
        "icon": string
      }
    ],
    "base": string,
    "main": {
      "temp": number,
      "feels_like": number,
      "temp_min": number,
      "temp_max": number,
      "pressure": number,
      "humidity": number,
      "sea_level": number,
      "grnd_level": number
    },
    "visibility": number,
    "wind": {
      "speed": number,
      "deg": number,
      "gust": number
    },
    "clouds": {
      "all": number
    },
    "dt": number,
    "sys": {
      "country": string,
      "sunrise": number,
      "sunset": number
    },
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
  }

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiKey = config.weatherKey
    const query = getQuery(event)
    const latitude = query.latitude
    const longitude = query.longitude
    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiEndpoint)
    const json: Weather = await response.json()
    return json
})