import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/users/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'apps/api-gateway/src/.env',
            isGlobal: true,
        }),
        AuthModule,
        CoreModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {}
