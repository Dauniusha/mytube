import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SerializationInterceptor } from '@mytube/infrastructure';
import { LoggingInterceptor } from '@mytube/core';
import { AppModule } from './app.module';
import { ApiModule } from './api.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'videos',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'videos-consumer',
            },
        },
    });

    app.useGlobalInterceptors(
        new SerializationInterceptor(),
        new LoggingInterceptor(),
    );

    const apiApp = await NestFactory.create(ApiModule, {
        cors: {
            origin: [
                'http://localhost:3000',
            ],
        },
    });

    await Promise.all([
        app.listen(),
        apiApp.listen(3001),
    ]);
}
bootstrap();
