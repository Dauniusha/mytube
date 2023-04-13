import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelsModule } from './modules/channels/channels.module';
import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/channels/src/.env',
      isGlobal: true,
    }),
    CoreModule,
    UsersModule,
    ChannelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
