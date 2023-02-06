import { Controller, Get } from '@nestjs/common';
import { MicroseviceService } from './microsevice.service';

@Controller()
export class MicroseviceController {
  constructor(private readonly microseviceService: MicroseviceService) {}

  @Get()
  getHello(): string {
    return this.microseviceService.getHello();
  }
}
