import { Module } from '@nestjs/common';
import { S3Service } from '../infrastructure/s3.service';
import { VideosRepository } from '../repositories/videos.repository';
import { VideoStreamingController } from './video-streaming.controller';
import { VideoStreamingService } from './video-strreaming.service';

@Module({
  imports: [],
  controllers: [VideoStreamingController],
  providers: [
    VideosRepository,
    VideoStreamingService,
    S3Service,
  ],
})
export class VideoStreamingModule {}
