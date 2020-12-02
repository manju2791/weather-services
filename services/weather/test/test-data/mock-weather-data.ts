import { ICityListAPI, IWeatherAPI } from '../../src/weather/interfaces/openweatherapi.interface';

export const CityByIdAPIResponse: IWeatherAPI = {
  coord: {
    lon: 145.77,
    lat: -16.92,
  },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04n',
    },
  ],
  base: 'stations',
  main: {
    temp: 298.93,
    feels_like: 301.27,
    temp_min: 298.71,
    temp_max: 299.15,
    pressure: 1011,
    humidity: 78,
  },
  visibility: 10000,
  wind: {
    speed: 3.1,
    deg: 160,
  },
  clouds: {
    all: 75,
  },
  dt: 1606834801,
  sys: {
    type: 1,
    id: 9490,
    country: 'AU',
    sunrise: 1606851273,
    sunset: 1606898308,
  },
  timezone: 36000,
  id: 2172797,
  name: 'Cairns',
  cod: 200,
};

export const CityListAPIResponse: ICityListAPI = {
  list: [
    {
      id: 495260,
      name: 'Shcherbinka',
      coord: {
        lat: 55.5,
        lon: 37.56,
      },
      main: {
        temp: 270.88,
        feels_like: 267.05,
        temp_min: 270.37,
        temp_max: 271.15,
        pressure: 1032,
        humidity: 92,
      },
      dt: 1606838946,
      wind: {
        speed: 2,
        deg: 140,
      },
      sys: {
        country: 'RU',
      },
      rain: null,
      snow: null,
      clouds: {
        all: 90,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
    },
    {
      id: 564517,
      name: 'Dubrovitsy',
      coord: {
        lat: 55.44,
        lon: 37.49,
      },
      main: {
        temp: 270.78,
        feels_like: 266.94,
        temp_min: 270.37,
        temp_max: 271.15,
        pressure: 1032,
        humidity: 92,
      },
      dt: 1606838714,
      wind: {
        speed: 2,
        deg: 140,
      },
      sys: {
        country: 'RU',
      },
      rain: null,
      snow: null,
      clouds: {
        all: 90,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
    },
    {
      id: 570578,
      name: 'Butovo',
      coord: {
        lat: 55.55,
        lon: 37.58,
      },
      main: {
        temp: 270.85,
        feels_like: 267.02,
        temp_min: 270.37,
        temp_max: 271.15,
        pressure: 1032,
        humidity: 92,
      },
      dt: 1606838715,
      wind: {
        speed: 2,
        deg: 140,
      },
      sys: {
        country: 'RU',
      },
      rain: null,
      snow: {
        '1h': 0.15,
      },
      clouds: {
        all: 90,
      },
      weather: [
        {
          id: 600,
          main: 'Snow',
          description: 'light snow',
          icon: '13n',
        },
      ],
    },
    {
      id: 545782,
      name: 'Kommunarka',
      coord: {
        lat: 55.57,
        lon: 37.49,
      },
      main: {
        temp: 270.9,
        feels_like: 267.07,
        temp_min: 270.37,
        temp_max: 271.15,
        pressure: 1032,
        humidity: 92,
      },
      dt: 1606838713,
      wind: {
        speed: 2,
        deg: 140,
      },
      sys: {
        country: 'RU',
      },
      rain: null,
      snow: null,
      clouds: {
        all: 90,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
    },
    {
      id: 6417490,
      name: 'Lesparkkhoz',
      coord: {
        lat: 55.54,
        lon: 37.6,
      },
      main: {
        temp: 270.85,
        feels_like: 267.02,
        temp_min: 270.37,
        temp_max: 271.15,
        pressure: 1032,
        humidity: 92,
      },
      dt: 1606839234,
      wind: {
        speed: 2,
        deg: 140,
      },
      sys: {
        country: 'RU',
      },
      rain: null,
      snow: null,
      clouds: {
        all: 90,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
    },
  ]
};
