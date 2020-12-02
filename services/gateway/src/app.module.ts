import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { WeatherModule } from './weather/weather.module';
import { HttpErrorFilter } from './filters/exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

@Module({
    imports: 
    [
        WeatherModule,
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
            modifyConfigName: name => {
              return name.replace(name, 'config');;
            }
          }),
],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule { }
