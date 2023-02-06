import { Module } from '@nestjs/common';
import { MicroseviceController } from './microsevice.controller';
import { MicroseviceService } from './microsevice.service';

@Module({
  imports: [],
  controllers: [MicroseviceController],
  providers: [MicroseviceService],
})
export class MicroseviceModule {}
