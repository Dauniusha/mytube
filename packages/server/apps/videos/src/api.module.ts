import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core/core.module';
import { VideoStreamingModule } from './modules/videos/video-streaming/video-streaming.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/videos/src/.env',
      isGlobal: true,
    }),
    CoreModule,
    VideoStreamingModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
