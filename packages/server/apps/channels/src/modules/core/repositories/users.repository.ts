import { Global } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { User } from '../../../prisma/generated';
import { PrismaService } from '../../core/prisma/prisma.service';

@Global()
@Injectable()
export class UsersRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    createUser(user: User) {
        return this.prismaService.client.user.create({
            data: user,
        });
    }

    deleteUser(userId: string) {
        return this.prismaService.client.user.delete({
            where: {
                userId,
            },
        });
    }

    getUser(userId: string) {
        return this.prismaService.client.user.findUnique({
            where: {
                userId,
            },
        });
    }
}
