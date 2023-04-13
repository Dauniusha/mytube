import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    CreateUserProfileInput, EditUserProfileInput, UserProfile,
} from '@mytube/shared/users/models/user-profiles';
import { PrismaService } from '../core/prisma/prisma.service';
import { UserProfilesRepository } from './repositories/user-profiles.repository';
import { UsersRepository } from '../auth/repositories/users.repository';

@Injectable()
export class ProfilesService {
    constructor(
        private readonly transactionService: PrismaService,
        private readonly userProfilesRepository: UserProfilesRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async createProfile(userEmail: string, createProfileData: CreateUserProfileInput) {
        const user = await this.usersRepository.getUser(userEmail);

        if (!user) {
            throw new Error(`User with email: ${userEmail} doesn't exists.`);
        }

        const profile = await this.userProfilesRepository.getProfile(user.email);

        if (profile) {
            throw new Error(`User profile for email: ${user.email} already exists.`);
        }

        const [
            { email, firstName, lastName, username, avatar },
        ] = await this.transactionService.createTransaction<[UserProfile, void]>((dbClient) => {
            return Promise.all([
                this.userProfilesRepository.createProfile(user.email, createProfileData, dbClient),
                this.usersRepository.incrementOnboardingStep(user, dbClient),
            ]);
        });

        return new UserProfile(email, firstName, lastName, username, avatar);
    }

    async getProfile(userEmail: string) {
        const {
            email,
            firstName,
            lastName,
            username,
            avatar,
        } = await this.userProfilesRepository.getProfile(userEmail) || {};

        if (!email) {
            throw new Error(`User profile for email: ${userEmail} not found.`);
        }

        return new UserProfile(email, firstName, lastName, username, avatar);
    }

    async getProfileByUsername(username: string) {
        const {
            email,
            firstName,
            lastName,
            avatar,
        } = await this.userProfilesRepository.getProfile(username) || {};

        if (!email) {
            throw new Error(`User profile for username: ${username} not found.`);
        }

        return new UserProfile(email, firstName, lastName, username, avatar);
    }

    async editProfile(userEmail: string, editProfileData: EditUserProfileInput) {
        const profile = await this.userProfilesRepository.getProfile(userEmail);

        if (!profile) {
            throw new Error(`User profile for email: ${userEmail} doesn't exists.`);
        }

        const {
            email,
            firstName,
            lastName,
            username,
            avatar,
        } = await this.userProfilesRepository.editProfile(userEmail, editProfileData);
        
        return new UserProfile(email, firstName, lastName, username, avatar);
    }
}
