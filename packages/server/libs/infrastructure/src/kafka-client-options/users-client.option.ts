import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { KafkaRequestSerializer } from '@nestjs/microservices/serializers';
import { USERS_MICROCERVICE } from '../constants/users-microservice.constant';

export const usersClientOptions = (clientId: string): ClientProviderOptions => {
    return {
        name: USERS_MICROCERVICE,
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: clientId,
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
    };
}
