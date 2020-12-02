import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { AREA_RADIUS, CITY_COUNT, ERR_MSG, WEATHER_API_PATHS } from '../../const/constant';
import { HTTP_METHOD } from '../../const/enums';
import { WeatherHttpClient } from '../clients/weather.client';
import { CitiesFinderDTO } from '../dtos/city.dto';
import { ICityListAPI, ICityListAttributes, IWeatherAPI } from '../interfaces/openweatherapi.interface';
import { ICity, ICityList, ICityWeather } from '../interfaces/weather.interface';
import { DistanceUtilityService } from './distance-calc.service';

@Injectable()
export class WeatherService {
  readonly apiKey: string;
  readonly weatherURL: string;
  constructor(private client: WeatherHttpClient, @InjectConfig() private readonly configSvc: ConfigService) {
    this.apiKey = this.configSvc.get('config.weather_api_key');
    this.weatherURL = this.configSvc.get('config.weather_api_url');
  }

  async getCities({ lng, lat }: CitiesFinderDTO): Promise<ICityList[]> {
    if (!lng || !lat || isNaN(lng) || isNaN(lat)) {
      throw new RpcException(new BadRequestException(ERR_MSG.LNG_LAT_INVALID));
    }
    const res: ICityListAPI = await this.fetchCitiesData({ lng, lat });
    const citylist = res.list.filter((city) => this.isWithInTenKm(lat, lng, city.coord.lat, city.coord.lon));
    const cityDetails = this.formatCitiesList(citylist);
    return cityDetails;
  }

  async getCityDetails(id: number): Promise<ICity> {
    const res: IWeatherAPI = await this.fetchCityDataById(id);
    const cityDetails = this.formatCityDetails(res);
    return cityDetails;
  }

  async getCityWeather(id: number): Promise<ICityWeather> {
    const res: IWeatherAPI = await this.fetchCityDataById(id);
    const weatherDetails = await this.formatWeatherDetails(res);
    return weatherDetails;
  }

  formatCityDetails(data: IWeatherAPI): ICity {
    return {
      id: data.id,
      name: data.name,
      lat: data.coord.lat,
      lng: data.coord.lon,
    };
  }
  formatWeatherDetails(data: IWeatherAPI): ICityWeather {
    return {
      type: !!data.weather[0] ? data.weather[0].main : '',
      type_description: !!data.weather[0] ? data.weather[0].description : '',
      sunrise: this.toISODateString(data.sys.sunrise),
      sunset: this.toISODateString(data.sys.sunset),
      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      clouds_percent: data.clouds.all,
      wind_speed: data.wind.speed,
    };
  }
  toISODateString(dateInMs: number): string {
    return new Date(dateInMs).toISOString();
  }

  formatCitiesList(data: ICityListAttributes[]): ICityList[] {
    return data.map((city) => ({ id: city.id, name: city.name }));
  }

  async fetchCitiesData(query): Promise<ICityListAPI> {
    return await this.makeRequest({
      method: HTTP_METHOD.GET,
      baseURL: this.weatherURL,
      path: WEATHER_API_PATHS.FIND,
      params: { lon: query.lng, lat: query.lat, cnt: CITY_COUNT, appid: this.apiKey },
    });
  }

  async fetchCityDataById(id: number): Promise<IWeatherAPI> {
    return await this.makeRequest({
      method: HTTP_METHOD.GET,
      baseURL: this.weatherURL,
      path: WEATHER_API_PATHS.WEATHER,
      params: { id, appid: this.apiKey },
    });
  }

  private async makeRequest(options): Promise<any> {
    return await this.client.makeRequest(options).catch((error) => {
      if (error instanceof NotFoundException || error.response.status === 404) {
        throw new RpcException(new NotFoundException(error.response.data));
      } else {
        throw new RpcException(new BadRequestException(error.response.data));
      }
    });
  }

  isWithInTenKm(lat1, lon1, lat2, lon2): boolean {
    const distance = DistanceUtilityService.getDistance(lat1, lon1, lat2, lon2);
    const d = distance <= AREA_RADIUS ? true : false;
    return d;
  }
}
