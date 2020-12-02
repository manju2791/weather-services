export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 50051,
  weather_api_key: process.env.WEATHER_APIKEY,
  weather_api_url: process.env.WEATHER_APIURL || 'https://api.openweathermap.org/data/2.5',
  redisURL: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

};
