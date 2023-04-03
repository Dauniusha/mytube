import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'apps/users/src/.env',
            isGlobal: true,
        }),
        CoreModule,
        AuthModule,
        ProfilesModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {}
