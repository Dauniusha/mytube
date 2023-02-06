import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroseviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
