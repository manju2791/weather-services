import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PATTERN } from '../const/constant';
import { CustomRpcExceptionFilter } from '../filters/rpc-exception.filter';
import { CitiesFinderDTO } from './dtos/city.dto';
import { ICity, ICityList, ICityWeather } from './interfaces/weather.interface';
import { WeatherService } from './services/weather.service';

@UseFilters(new CustomRpcExceptionFilter())
@Controller()
export class WeatherController {
  constructor(private readonly weatherSvc: WeatherService) {}

  @MessagePattern(PATTERN.GET_ALL_CITY_LIST)
  async fetchCitiesList(query: CitiesFinderDTO): Promise<ICityList[]> {
    return await this.weatherSvc.getCities(query);
  }

  @MessagePattern(PATTERN.GET_CITY_DETAILS_BY_CITYID)
  async fetchCityDetails(cityId: number): Promise<ICity> {
    return await this.weatherSvc.getCityDetails(cityId);
  }

  @MessagePattern(PATTERN.GET_CITY_WEATHER_BY_CITYID)
  async create(id: number): Promise<ICityWeather> {
    return await this.weatherSvc.getCityWeather(id);
  }
}
