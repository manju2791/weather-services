import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from 'nestjs-config';
import { ERR_MSG } from '../src/const/constant';
import { WeatherHttpClient } from '../src/weather/clients/weather.client';
import { WeatherService } from '../src/weather/services/weather.service';
import { CityByIdAPIResponse, CityListAPIResponse } from './test-data/mock-weather-data';
describe('WeatherService', () => {
  let weatherSvc: WeatherService;
  let httpClient: WeatherHttpClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService, WeatherHttpClient, { provide: ConfigService, useValue: new ConfigService() }],
    }).compile();

    weatherSvc = module.get<WeatherService>(WeatherService);
    httpClient = module.get<WeatherHttpClient>(WeatherHttpClient);
  });

  it('should be defined', () => {
    expect(weatherSvc).toBeDefined();
  });

  it('getCities() should return city list', async () => {
    // argumnets
    const args = {
      lat: 55.5,
      lng: 37.5,
    };
    //mock
    jest.spyOn(weatherSvc, 'fetchCitiesData').mockImplementation(() => new Promise((resolve) => resolve(CityListAPIResponse)));
    //test getCities
    await weatherSvc.getCities({ lat: args.lat, lng: args.lng }).then((res) => {
      expect(res.length).toBe(5);
      res.filter((city) => {
        expect(city.id).toBeTruthy(), expect(city.name).toBeTruthy();
      });
    });
  });

  it('getCities() should throw error when invalid lng/lat parameters', async () => {
    // argumnets
    const args = {
      lat: 55.5,
      lng: null,
    };
    //mock
    jest.spyOn(weatherSvc, 'fetchCitiesData').mockImplementation(() => new Promise((resolve) => resolve(CityListAPIResponse)));
    //test getCityDetails
    try {
      await weatherSvc.getCities({ lat: args.lat, lng: args.lng });
    } catch (e) {
      // assert
      expect(e.getError().status).toBe(400);
      expect(e.getError().response.message).toBe(ERR_MSG.LNG_LAT_INVALID);
    }
  });

  it('getCityDetails() should return city details based on cityId', async () => {
    // argumnets
    const cityId = 2172797;
    const testData = CityByIdAPIResponse;
    //mock
    jest.spyOn(weatherSvc, 'fetchCityDataById').mockImplementation(() => new Promise((resolve) => resolve(testData)));
    //test getCityDetails
    await weatherSvc.getCityDetails(cityId).then((city) => {
      expect(city.id).toBe(testData.id);
      expect(city.name).toBe(testData.name);
      expect(city.lat).toBe(testData.coord.lat);
      expect(city.lng).toBe(testData.coord.lon);
    });
  });

  it('getCityWeather() should return city weather details based on cityId', async () => {
    // argumnets
    const cityId = 2172797;
    const testData = CityByIdAPIResponse;
    //mock
    jest.spyOn(weatherSvc, 'fetchCityDataById').mockImplementation(() => new Promise((resolve) => resolve(testData)));
    //test getCityWeather
    await weatherSvc.getCityWeather(cityId).then((city) => {
      expect(city.type).toBe(testData.weather[0].main);
      expect(city.type_description).toBe(testData.weather[0].description);
      expect(city.wind_speed).toBe(testData.wind.speed);
      expect(city.clouds_percent).toBe(testData.clouds.all);
      expect(city.humidity).toBe(testData.main.humidity);
      expect(city.pressure).toBe(testData.main.pressure);
      expect(city.sunrise).toBe(new Date(testData.sys.sunrise).toISOString());
      expect(city.sunset).toBe(new Date(testData.sys.sunset).toISOString());
      expect(city.temp).toBe(testData.main.temp);
      expect(city.temp_max).toBe(testData.main.temp_max);
      expect(city.temp_min).toBe(testData.main.temp_min);
    });
  });

  it('getCityDetails() should throw error when invalid cityId', async () => {
    // argumnets
    const inCorrectCityId = 21797;
    //mock
    jest.spyOn(httpClient, 'makeRequest').mockRejectedValue(new NotFoundException());
    //test getCityDetails
    try {
      await weatherSvc.getCityDetails(inCorrectCityId);
    } catch (e) {
      expect(e.getError().status).toBe(404);
      expect(e.getError().response.message).toBe('Not Found');
    }
  });

  it('getCityWeather() should throw error when invalid cityId', async () => {
    // argumnets
    const inCorrectCityId = 21797;
    //mock
    jest.spyOn(httpClient, 'makeRequest').mockRejectedValue(new NotFoundException());
    //test getCityDetails
    try {
      await weatherSvc.getCityWeather(inCorrectCityId);
    } catch (e) {
      expect(e.getError().status).toBe(404);
      expect(e.getError().response.message).toBe('Not Found');
    }
  });
});
