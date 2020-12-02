# Introduction
This project comprises of REST based microservices to provide weather information in different cities. 

## Implementation
The project consists of two services namely `gateway` and `weather` which are built using NestJS
framework. `gateway` service acts as an entry point which then forwards the request 
to the `weather` microservice.  The communication between the microservices uses Pub/Sub model 
which is established using Redis transport layer. The services can be independently containerized 
and deployed to Docker. 
 
 
 ##Build and run
To build and run the project on your local machine use the command `npm run up`
 
To build docker images for the services use the command `npm run build`

To run the containers on Docker use the command `npm run start` 

##Endpoints
### `GET /cities?lat={latitude}&lng={longitude}`
List the available cities around the specified latitude/longitude within a radius of 10 kilometers.
```
Ex: http://localhost:8080/cities?lat=49.48&lng=8.46

Response:
200 OK

[
    {"id":2873891,"name":"Mannheim"}, 
    {"id":6555232,"name":"Altrip"}, 
    ...
]
```

### `GET /cities/{city_id}`
Retrieve the details for a city (by city_id)

```
Ex: http://localhost:8080/cities/2873891

Response:
200 OK

{
  "id":2873891,
  "name":"Mannheim", "lat":49.488331, "lng":8.46472
}
```

### `GET /cities/{city_id}/weather`
Retrieve the weather data for a city (by city_id)

Returns:

```
Ex: http://localhost:8080/cities/2873891/weather

Response:
200 OK

{
  "type": "Clear",
  "type_description": "clear sky",
  "sunrise": "2016-08-23T08:00:00.000Z",
  "sunset": "2016-08-23T22:00:00.000Z",
  "temp": 29.72,
  "temp_min": 26.67,
  "temp_max": 35,
  "pressure": 1026,
  "humidity": 36,
  "clouds_percent": 0,
  "wind_speed": 1.5
}
```