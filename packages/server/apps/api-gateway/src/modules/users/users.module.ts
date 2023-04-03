import { Module } from '@nestjs/common';
import { usersClientOptions } from '@mytube/infrastructure';
import { ClientsModule } from '@nestjs/microservices';
import { AuthResolver } from './auth/auth.resolver';
import { ProfilesResolver } from './profiles/profiles.resolver';

@Module({
    imports: [
        ClientsModule.register([
            usersClientOptions('api-gateway'),
        ]),
    ],
    providers: [AuthResolver, ProfilesResolver],
    controllers: [],
})
export class UsersModule {}
