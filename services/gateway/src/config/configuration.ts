  export default {
    apiVersion: process.env.API_VERSION || 'v1',
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 8080,
    redisURL: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  }

