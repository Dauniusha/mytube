import 'source-map-support/register';
import * as bodyParser from 'body-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: [
                'http://localhost:4200',
            ],
        },
    });

    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

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
