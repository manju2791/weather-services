import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { ERR_MSG } from '../src/const/constant';
import { WeatherHttpClient } from '../src/weather/clients/weather.client';
import { WeatherService } from '../src/weather/services/weather.service';
describe('WeatherService - weatherclient integration test', () => {
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
      providers: [WeatherService, WeatherHttpClient],
    })
    .overrideProvider(ConfigService)
      .useClass(MockConfigService)
    .compile();

    weatherSvc = module.get<WeatherService>(WeatherService);
    httpClient = module.get<WeatherHttpClient>(WeatherHttpClient);
  });

  it('should be defined', () => {
    expect(weatherSvc).toBeDefined();
  });

  it('getCities() should return city list', async () => {
    // arguments
    const args = {
      lat: 55.5,
      lng: 37.5,
    };
    //test getCities
    await weatherSvc.getCities({ lat: args.lat, lng: args.lng }).then((res) => {
      expect(res.length).toBeDefined();
      res.filter((city) => {
        expect(city.id).toBeTruthy(), expect(city.name).toBeTruthy();
      });
    });
  });


  it('getCityDetails() should return city details based on cityId', async () => {
    // arguments
    const cityId = 2172797;
    const res_data = { id: 2172797, name: 'Cairns', lat: -16.92, lng: 145.77 };
    //test getCityDetails
    await weatherSvc.getCityDetails(cityId).then((city) => {
      expect(city.id).toBe(res_data.id);
      expect(city.name).toBe(res_data.name);
      expect(city.lat).toBe(res_data.lat);
      expect(city.lng).toBe(res_data.lng);
    });
  });

  it('getCityWeather() should return city weather details based on cityId', async () => {
    // arguments
    const cityId = 2172797;
    //test getCityWeather
    await weatherSvc.getCityWeather(cityId).then((body) => {
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

  it('getCities() should throw error when lng/lat parameters are not found', async () => {
    // arguments
    const args = {
      lat: 1,
      lng: 2,
    };
    //test getCityDetails
    try {
      await weatherSvc.getCities({ lat: args.lat, lng: args.lng });
    } catch (e) {
      // assert
      expect(e.getError().status).toBe(404);
    }
  });
});
