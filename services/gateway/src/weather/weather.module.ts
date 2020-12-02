import { Module } from '@nestjs/common';
import { ClientOptions, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from 'nestjs-config';
import { WEATHER_SERVICE } from './weather.constants';
import { WeatherController } from './weather.controller';

@Module({
  providers: [
    {
      provide: WEATHER_SERVICE,
      useFactory: (configSvc: ConfigService) => {
        const prodSvcOption: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            url: configSvc.get('config.redisURL'),
          },
        };
        return ClientProxyFactory.create(prodSvcOption);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [WeatherController],
})
export class WeatherModule {}
