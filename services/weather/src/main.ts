import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, RedisOptions, Transport } from "@nestjs/microservices";
import { SERVER_CONNECTION_MSG } from './const/constant';
import config from './config/configuration';
const microserviceOptions: RedisOptions = {
    transport: Transport.REDIS,
    options: {
        url: config.redisURL
    }
}

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions);
    await app.listen(() => SERVER_CONNECTION_MSG);
}
bootstrap();
