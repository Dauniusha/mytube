import { Injectable } from '@nestjs/common';
import { Channel, Prisma } from '../../../prisma/generated';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class ChannelsRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    createChannel(
        userId: string,
        channel: Omit<Channel, 'avatar' | 'id' | 'description' | 'createdAt' | 'ownerId'>
            & Pick<Partial<Channel>, 'avatar' | 'description'>,
        dbClient?: Prisma.TransactionClient,
    ) {
        const client = dbClient || this.prismaService.client;
        console.log(channel)

        return client.channel.create({
            data: {
                ...channel,
                ownerId: userId,
            },
        });
    }

    editChannel(
        userId: string,
        channel: Omit<Partial<Channel>, 'ownerId' | 'id' | 'createdAt'>,
        dbClient?: Prisma.TransactionClient,
    ) {
        const client = dbClient || this.prismaService.client;

        return client.channel.update({
            where: {
                ownerId: userId,
            },
            data: {
                ...channel,
            },
        });
    }

    getChannelByAlias(alias: string) {
        return this.prismaService.client.channel.findUnique({
            where: {
                alias,
            },
        });
    }

    getChannelByUserId(userId: string) {
        return this.prismaService.client.channel.findUnique({
            where: {
                ownerId: userId,
            },
        });
    }

    getAll() {
        return this.prismaService.client.channel.findMany();
    }
}
