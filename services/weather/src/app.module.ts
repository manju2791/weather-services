import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    WeatherModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: (name) => {
        return name.replace(name, 'config');
      },
    }),
  ],
})
export class AppModule {}
