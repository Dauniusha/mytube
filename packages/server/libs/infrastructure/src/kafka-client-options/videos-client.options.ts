import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { KafkaRequestSerializer } from '@nestjs/microservices/serializers';
import { VIDEOS_MICROCERVICE } from '../constants/videos-microservice.constant';

export const videosClientOptions = (clientId: string): ClientProviderOptions => {
    return {
        name: VIDEOS_MICROCERVICE,
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: clientId,
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'videos-consumer',
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
