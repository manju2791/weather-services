import { Controller, Get, HttpStatus, Inject, Param, Query, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { PATTERN, WEATHER_SERVICE } from './weather.constants';
import { CityFinderDTO, CityIdDTO } from './weather.dto';

@Controller('/cities')
export class WeatherController {
  constructor(@Inject(WEATHER_SERVICE) private readonly client: ClientProxy) {}

  @Get('/')
  async fetchCitiesList(@Query() query: CityFinderDTO, @Res() res: Response) {
    const cityList = await this.client.send(PATTERN.GET_ALL_CITY_LIST, query).toPromise();
    res.status(HttpStatus.OK).send(cityList);
  }

  @Get(':city_id')
  async fetchCityDetailsById(@Param() params: CityIdDTO, @Res() res: Response) {
    const cityDetails = await this.client.send(PATTERN.GET_CITY_DETAILS_BY_CITYID, params.city_id).toPromise();
    res.status(HttpStatus.OK).send(cityDetails);
  }

  @Get(':city_id/weather')
  async fetchCityWeather(@Param() params: CityIdDTO, @Res() res: Response) {
    const weather = await this.client.send(PATTERN.GET_CITY_WEATHER_BY_CITYID, params.city_id).toPromise();
    res.status(HttpStatus.OK).send(weather);
  }
}
