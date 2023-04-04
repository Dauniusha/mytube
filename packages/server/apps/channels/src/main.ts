import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SerializationInterceptor } from '@mytube/infrastructure';
import { LoggingInterceptor } from '@mytube/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'channels',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'channels-consumer',
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
