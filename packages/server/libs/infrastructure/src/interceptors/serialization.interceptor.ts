import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
        return next.handle().pipe(map((data) => JSON.stringify(data)));
    }
}