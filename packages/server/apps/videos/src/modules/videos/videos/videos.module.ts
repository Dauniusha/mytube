import { Module } from '@nestjs/common';
import { S3Service } from '../infrastructure/s3.service';
import { VideosRepository } from '../repositories/videos.repository';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [],
  controllers: [VideosController],
  providers: [
    VideosService,
    VideosRepository,
    S3Service,
  ],
})
export class VideosModule {}
