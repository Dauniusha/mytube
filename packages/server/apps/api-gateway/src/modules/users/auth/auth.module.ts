import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaRequestSerializer } from '@nestjs/microservices/serializers';
import { USERS_MICROCERVICE } from '../../../constants';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: USERS_MICROCERVICE,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'users',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'users-consumer',
                    },
                    serializer: {
                        serialize: (function() {
                            const kafkaSerializer = new KafkaRequestSerializer();

                            return (value: any, options?: any) => {
                                const serialized = value instanceof Buffer
                                    ? value
                                    : JSON.stringify(value);

                                return kafkaSerializer.serialize(serialized);
                            };
                        })(),
                    },
                },
            },
        ]),
    ],
    providers: [AuthResolver],
    controllers: [],
})
export class AuthModule {}
