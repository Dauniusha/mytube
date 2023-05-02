import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';
import { CoreModule } from './modules/core/core.module';
import { VideosModule } from './modules/videos/videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/videos/src/.env',
      isGlobal: true,
    }),
    CoreModule,
    VideosModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
