import 'source-map-support/register';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: false,
            exceptionFactory: (err) => {
                const messages = err.map((err) => {
                    const { constraints, property } = err;

                    const errorCause = constraints
                        ? Object.values(constraints).join(', ')
                        : 'nested'; // TO DO: redesign it

                    return `${property}: ${errorCause}`;
                });
                const resultMessage = `Invalid request:\n ${messages.join('\n ')}`;

                return new BadRequestException({ message: resultMessage, code: 'invalid_request' });
            },
        }),
    );

    await app.listen(3000);
}
bootstrap();
