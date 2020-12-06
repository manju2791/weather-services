import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { WEATHER_SERVICE } from '../src/weather/weather.constants';
import { WeatherController } from '../src/weather/weather.controller';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ErrorMessages } from '../src/constant/constant';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '../src/filters/exception.filter';
import { ResponseErrorCode } from '../src/constant/constant';
import { doesNotMatch } from 'assert';

describe('Weather APIs (e2e)', () => {
    let app: INestApplication;
    let client: ClientProxy;
    let weatherController: WeatherController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          { 
            name: WEATHER_SERVICE,
            transport: Transport.REDIS, 
            options: {
              url: 'redis://redis:6379',
            }
          },
        ]),
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: HttpErrorFilter
      },
      ]
    }).compile();

    weatherController = moduleFixture.get<WeatherController>(WeatherController);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    app.connectMicroservice({
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis:6379',
      }
    });

    await app.startAllMicroservicesAsync();
    await app.init();

    client = app.get(WEATHER_SERVICE);
    await client.connect();
  });

  describe('GET /cities?lat={latitude}&lng={longitude}', () => {
  it('should throw error when query params(lng/lat) not passed', () => {
    const errMsg = `${ErrorMessages.LAT_REQUIRED},${ErrorMessages.LNG_REQUIRED}`;
    return request(app.getHttpServer())
      .get('/cities')
      .expect(400)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.BAD_REQUEST);
        expect(body.message).toBe(errMsg)

      })
  });
  it('should throw error when query params(lng/lat) are not found', () => {
    return request(app.getHttpServer())
      .get('/cities/?lng=1&lat=2')
      .expect(404)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.NOT_FOUND);
        expect(body.message).toBe(ErrorMessages.NOT_FOUND)

      })
  });
  it('should throw error when query params(lng/lat) are invalid', () => {
    return request(app.getHttpServer())
      .get('/cities/?lng=12z&lat=2i')
      .expect(400)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.BAD_REQUEST);
        expect(body.message).toBe(ErrorMessages.LNG_LAT_INVALID)

      })
  });
  it('should return list of cities in 10km rang of given query params(lng/lat)', () => {
    return request(app.getHttpServer())
      .get('/cities/?lat=55.5&lng=33.55')
      .expect(200)
      .expect(({body}) => {
        expect(body.length).toBe(1);
        body.filter((city) => {
          expect(city.id).toBeTruthy(),
          expect(city.name).toBeTruthy();
        });

      })
  });
});

describe('GET /cities/{city_id}', () => {
  it('should return the details of the city', () => {
    const res_data = { id: 2172797, name: 'Cairns', lat: -16.92, lng: 145.77 };
    return request(app.getHttpServer())
      .get('/cities/2172797')
      .expect(200)
      .expect(({body}) => {
        expect(body.id).toBe(res_data.id);
        expect(body.name).toBe(res_data.name);
        expect(body.lat).toBe(res_data.lat);
        expect(body.lng).toBe(res_data.lng);
      })
  });
  it('should throw error when city not found', () => {
    return request(app.getHttpServer())
      .get('/cities/23891')
      .expect(404)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.NOT_FOUND)
        expect(body.message).toBe(ErrorMessages.NOT_FOUND)
      })
  });
  it('should throw error when city_id is invalid ', () => {
    return request(app.getHttpServer())
      .get('/cities/23891tz')
      .expect(400)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.BAD_REQUEST)
        expect(body.message).toBe(ErrorMessages.CITYID_INVALID)
      })
  });
});

describe('GET /cities/{city_id}', () => {
  it('should return the details of the city by city_id', () => {
    const res_data = { id: 2172797, name: 'Cairns', lat: -16.92, lng: 145.77 };
    return request(app.getHttpServer())
      .get('/cities/2172797')
      .expect(200)
      .expect(({body}) => {
        expect(body.id).toBe(res_data.id);
        expect(body.name).toBe(res_data.name);
        expect(body.lat).toBe(res_data.lat);
        expect(body.lng).toBe(res_data.lng);
      })
  });
  it('should throw error when city not found', () => {
    return request(app.getHttpServer())
      .get('/cities/23891')
      .expect(404)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.NOT_FOUND)
        expect(body.message).toBe(ErrorMessages.NOT_FOUND)
      })
  });
  it('should throw error when city_id is invalid ', () => {
    return request(app.getHttpServer())
      .get('/cities/23891tz')
      .expect(400)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.BAD_REQUEST)
        expect(body.message).toBe(ErrorMessages.CITYID_INVALID)
      })
  });
});
describe('GET /cities/{city_id}/weather', () => {
  it('should return the weather data for a city by city_id', () => {
    return request(app.getHttpServer())
      .get('/cities/2172797/weather')
      .expect(200)
      .expect(({body}) => {
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
      })
  });
  it('should throw error when city not found', () => {
    return request(app.getHttpServer())
      .get('/cities/23891/weather')
      .expect(404)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.NOT_FOUND)
        expect(body.message).toBe(ErrorMessages.NOT_FOUND)
      })
  });
  it('should throw error when city_id is invalid ', () => {
    return request(app.getHttpServer())
      .get('/cities/23891tz/weather')
      .expect(400)
      .expect(({body}) => {
        expect(body.code).toBe(ResponseErrorCode.BAD_REQUEST)
        expect(body.message).toBe(ErrorMessages.CITYID_INVALID)
      })
  });
});

});
