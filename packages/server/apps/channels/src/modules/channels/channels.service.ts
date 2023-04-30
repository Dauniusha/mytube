import { Inject, Injectable } from '@nestjs/common';
import { Channel, CreateChannelInput, EditChannelInput } from '@mytube/shared/channels/models/channels';
import { PrismaService } from '../core/prisma/prisma.service';
import { ChannelsRepository } from './repositories/channels.repository';
import { UsersRepository } from '../core/repositories/users.repository';
import { ClientKafka } from '@nestjs/microservices';
import { USERS_MICROCERVICE } from '@mytube/infrastructure';
import { INCREASE_ONBOARDING_STEP_TOPIC } from '@mytube/shared/users/constants/auth';
import { TokenPayload } from '@mytube/shared/users/models/auth';

@Injectable()
export class ChannelsService {
    constructor(
        @Inject(USERS_MICROCERVICE) private readonly usersClient: ClientKafka,
        private readonly transactionService: PrismaService,
        private readonly usersRepository: UsersRepository,
        private readonly channelsRepository: ChannelsRepository,
    ) {}

    async createChannel(userId: string, createChannelData: CreateChannelInput): Promise<Channel> {
        const user = await this.usersRepository.getUser(userId);

        if (!user) {
            throw new Error(`User with id: ${userId} doesn't exists.`);
        }

        const [{
            id,
            ownerId,
            name,
            alias,
            createdAt,
            description,
            avatar,
        }] = await this.transactionService.createTransaction((dbClient) => {
            return Promise.all([
                this.channelsRepository.createChannel(
                    user.userId,
                    createChannelData,
                    dbClient,
                ),

                this.usersClient.emit<void, TokenPayload>(INCREASE_ONBOARDING_STEP_TOPIC, {
                    email: userId,
                }),
            ]);
        });

        return new Channel(id, ownerId, name, alias, createdAt, description, avatar);
    }

    async getChannel(channelOwnerId?: string, channelAlias?: string, channelId?: string): Promise<Channel> {
        if (!channelOwnerId && !channelAlias && !channelId) {
            throw new Error('Owner Id, alias or channel id should be present.');
        }

        const {
            id,
            ownerId,
            name,
            alias,
            createdAt,
            description,
            avatar,
        } = await this.channelsRepository.getChannel(channelOwnerId, channelAlias, channelId);

        return new Channel(id, ownerId, name, alias, createdAt, description, avatar);
    }

    async getMyChannel(ownerId: string): Promise<Channel> {
        const {
            id,
            name,
            alias,
            createdAt,
            description,
            avatar,
        } = await this.channelsRepository.getChannelByUserId(ownerId);

        return new Channel(id, ownerId, name, alias, createdAt, description, avatar);
    }

    async getChannels(): Promise<Channel[]> {
        const channels = await this.channelsRepository.getAll();

        return channels.map((x) => new Channel(
            x.id,
            x.ownerId,
            x.name,
            x.alias,
            x.createdAt,
            x.description,
            x.avatar,
        ));
    }

    async editChannel(userId: string, editChannelData: EditChannelInput): Promise<Channel> {
        const channel = await this.channelsRepository.getChannelByUserId(userId);

        if (!channel) {
            throw new Error(`Channel for user: ${userId} was not found.`);
        }

        const {
            id,
            ownerId,
            name,
            alias,
            createdAt,
            description,
            avatar,
        } = await this.channelsRepository.editChannel(userId, editChannelData);

        return new Channel(id, ownerId, name, alias, createdAt, description, avatar);
    }
}
