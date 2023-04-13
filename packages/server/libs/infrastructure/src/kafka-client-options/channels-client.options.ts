import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { KafkaRequestSerializer } from '@nestjs/microservices/serializers';
import { CHANNELS_MICROCERVICE } from '../constants/channels-microservice.constant';

export const channelsClientOptions = (clientId: string): ClientProviderOptions => {
    return {
        name: CHANNELS_MICROCERVICE,
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: clientId,
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'channels-consumer',
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
