import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { LoggingInterceptor, SerializationInterceptor } from './modules/core/interceptors';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'users',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'users-consumer',
            },
        },
    });

    app.useGlobalInterceptors(
        new SerializationInterceptor(),
        new LoggingInterceptor(),
    );

    await app.listen();
}
bootstrap();
