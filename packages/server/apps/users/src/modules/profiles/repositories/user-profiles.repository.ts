import { Injectable } from '@nestjs/common';
import { Prisma, User, UserProfile } from '../../../prisma/generated';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class UserProfilesRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    createProfile(
        email: string,
        user: Omit<UserProfile, 'avatar' | 'email'> & Pick<Partial<UserProfile>, 'avatar'>,
        dbClient?: Prisma.TransactionClient,
    ) {
        const client = dbClient || this.prismaService.client;

        return client.userProfile.create({
            data: {
                ...user,
                email: email.toUpperCase(),
            },
        });
    }

    editProfile(
        email: string,
        user: Omit<Partial<UserProfile>, 'email'>,
        dbClient?: Prisma.TransactionClient,
    ) {
        const client = dbClient || this.prismaService.client;

        return client.userProfile.update({
            where: {
                email: email.toUpperCase(),
            },
            data: {
                ...user,
            },
        });
    }

    getProfile(email: string) {
        return this.prismaService.client.userProfile.findUnique({
            where: {
                email: email.toUpperCase(),
            },
        });
    }
}
