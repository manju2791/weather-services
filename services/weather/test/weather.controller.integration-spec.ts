import { NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { WeatherHttpClient } from '../src/weather/clients/weather.client';
import { WeatherService } from '../src/weather/services/weather.service';
import { WeatherController } from '../src/weather/weather.controller';
import { CityByIdAPIResponse, CityListAPIResponse } from './test-data/mock-weather-data';
describe('WeatherService - weatherclient integration test', () => {
  let controller: WeatherController;
  let weatherSvc: WeatherService;
  let httpClient: WeatherHttpClient;

  class MockConfigService {
		config = {
      weather_api_key: 'ba7f2324737e426236bdf6cccd9d2346',
      weather_api_url: 'https://api.openweathermap.org/data/2.5',
		};
		get(key) {
					return this.config[key.split('.')[1]];
			}
  }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
          modifyConfigName: name => {
            return name.replace(name, 'config');;
          }
        }),
      ],
      controllers: [WeatherController],
      providers: [WeatherService, WeatherHttpClient],
    })
    .overrideProvider(ConfigService)
      .useClass(MockConfigService)
    .compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherSvc = module.get<WeatherService>(WeatherService);
    httpClient = module.get<WeatherHttpClient>(WeatherHttpClient);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('fetchCitiesList() should return city list', async () => {
    // arguments
    const args = {
      lat: 55.5,
      lng: 37.5,
    };
    // mock
    jest.spyOn(httpClient, 'makeRequest').mockImplementation(() => new Promise((resolve) => resolve(CityListAPIResponse)));
    //test fetchCitiesList
    await controller.fetchCitiesList({ lat: args.lat, lng: args.lng }).then((res) => {
      expect(res.length).toBeDefined();
      res.filter((city) => {
        expect(city.id).toBeTruthy(), expect(city.name).toBeTruthy();
      });
    });
  });


  it('fetchCityDetails() should return city details based on cityId', async () => {
    // arguments
    const cityId = 2172797;
    const res_data = { id: 2172797, name: 'Cairns', lat: -16.92, lng: 145.77 };
    // mock
    jest.spyOn(httpClient, 'makeRequest').mockImplementation(() => new Promise((resolve) => resolve(CityByIdAPIResponse)));
    //test fetchCityDetails
    await controller.fetchCityDetails(cityId).then((city) => {
      expect(city.id).toBe(res_data.id);
      expect(city.name).toBe(res_data.name);
      expect(city.lat).toBe(res_data.lat);
      expect(city.lng).toBe(res_data.lng);
    });
  });

  it('fetchCityWeather() should return city weather details based on cityId', async () => {
    // arguments
    const cityId = 2172797;
    // mock
    jest.spyOn(httpClient, 'makeRequest').mockImplementation(() => new Promise((resolve) => resolve(CityByIdAPIResponse)));
    //test fetchCityWeather
    await controller.fetchCityWeather(cityId).then((body) => {
      expect(body.type).toBeTruthy();
      expect(body.type_description).toBeTruthy();
      expect(body.sunrise).toBeTruthy();
      expect(body.sunset).toBeTruthy();
      expect(typeof body.temp).toBe('number');
      expect(typeof body.temp_min).toBe('number');
      expect(typeof body.temp_max).toBe('number');
      expect(typeof body.pressure).toBe('number');
      expect(typeof body.humidity).toBe('number');
      expect(typeof body.clouds_percent).toBe('number');
      expect(typeof body.wind_speed).toBe('number');
    });
  });

  it('fetchCityWeather() should throw error when city_id is invalid', async () => {
    // arguments
    const cityId = 2172;
    //test fetchCityWeather
    try {
      await controller.fetchCityWeather(cityId).then(r => {
      fail('test not reach here')
      });
    } catch (e) {
      // assert
      expect(e instanceof RpcException).toBeTruthy();
      expect(e.getError() instanceof NotFoundException).toBeTruthy();
      expect(e.getError().status).toBe(404);
    }
  });
  it('fetchCitiesList() should throw error when invalid lng/lat parameters', async () => {
    // arguments
    const args = {
      lat: 1,
      lng: 2,
    };
    // mock
    jest.spyOn(httpClient, 'makeRequest').mockRejectedValue(new NotFoundException());

    //test fetchCityWeather
    try {
      await controller.fetchCitiesList({ lat: args.lat, lng: args.lng });
      fail('test not reach here')
    } catch (e) {
      // assert
      expect(e instanceof RpcException).toBeTruthy();
      expect(e.getError() instanceof NotFoundException).toBeTruthy();
      expect(e.getError().status).toBe(404);
    }
  });
  it('fetchCityDetails() should throw error when invalid city_id', async () => {
    // arguments
    const cityId = 21;
    // mock
    jest.spyOn(httpClient, 'makeRequest').mockRejectedValue(new NotFoundException());
    //test fetchCityWeather
    try {
      await controller.fetchCityDetails(cityId);
      fail('test not reach here')
    } catch (e) {
      // assert
      expect(e instanceof RpcException).toBeTruthy();
      expect(e.getError() instanceof NotFoundException).toBeTruthy();
      expect(e.getError().status).toBe(404);
    }
  });
});
