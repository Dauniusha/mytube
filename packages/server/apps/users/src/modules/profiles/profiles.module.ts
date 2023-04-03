import { Module } from '@nestjs/common';
import { UsersRepository } from '../auth/repositories/users.repository';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { UserProfilesRepository } from './repositories/user-profiles.repository';

@Module({
    imports: [],
    providers: [UserProfilesRepository, UsersRepository, ProfilesService],
    controllers: [ProfilesController],
})
export class ProfilesModule {}
