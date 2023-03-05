import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('Kafka');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const topicName = (context.getArgByIndex(1) as KafkaContext).getTopic();
        return next.handle().pipe(tap(() => this.logger.log(`Messsage for topic ${topicName} successfully processed`)));
    }
}