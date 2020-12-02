import { Module } from '@nestjs/common';
import { WeatherHttpClient } from './clients/weather.client';
import { DistanceUtilityService } from './services/distance-calc.service';
import { WeatherService } from './services/weather.service';
import { WeatherController } from './weather.controller';
@Module({
  providers: [WeatherService, WeatherHttpClient, DistanceUtilityService],
  controllers: [WeatherController],
})
export class WeatherModule {}
