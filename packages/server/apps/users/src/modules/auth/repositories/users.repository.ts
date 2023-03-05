import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../../../prisma/generated';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    createUser(
        user: Omit<User, 'createdAt' | 'updatedAt' | 'lastSignIn'>,
        dbClient?: Prisma.TransactionClient,
    ) {
        const client = dbClient || this.prismaService.client;

        return client.user.create({
            data: {
                ...user,
                email: user.email.toUpperCase(),
            },
        });
    }

    getUser(email: string) {
        return this.prismaService.client.user.findUnique({
            where: {
                email: email.toUpperCase(),
            },
        });
    }

    async updateUser(
        user: Partial<User> & Pick<User, 'email'>,
        dbClient?: Prisma.TransactionClient,
    ) {
        const client = dbClient || this.prismaService.client;

        await client.user.update({
            where: {
                email: user.email.toUpperCase(),
            },
            data: user,
        });
    }

    async deleteUser(email: string, dbClient?: Prisma.TransactionClient) {
        const client = dbClient || this.prismaService.client;

        await client.user.delete({
            where: {
                email: email.toUpperCase(),
            },
        });
    }

    async resetRefreshToken(email: string) {
        await this.prismaService.client.user.update({
            where: {
                email: email.toUpperCase(),
            },
            data: {
                refreshToken: null,
            },
        });
    }
}
