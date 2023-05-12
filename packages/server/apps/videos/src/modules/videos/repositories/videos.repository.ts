import { Injectable } from "@nestjs/common";
import { Prisma, Video } from "../../../prisma/generated";
import { PrismaService } from "../../core/prisma/prisma.service";
import { VideoFilter } from "../interfaces/video-filter.interface";

@Injectable()
export class VideosRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(
        video: Omit<Video, 'id' | 'likes' | 'dislikes' | 'views' | 'createdAt'>,
        dbClient?: Prisma.TransactionClient,
    ): Promise<Video> {
        const prismaClient = dbClient ?? this.prismaService.client;

        return prismaClient.video.create({
            data: video,
        });
    }

    async delete(id: string) {
        await this.prismaService.client.video.delete({
            where: {
                id,
            },
        });
    }

    edit(id: string, video: Omit<Partial<Video>, 'id' | 'createdAt'>) {
        return this.prismaService.client.video.update({
            where: {
                id,
            },
            data: video,
        });
    }

    getById(id: string) {
        return this.prismaService.client.video.findUnique({
            where: {
                id,
            },
        });
    }

    getAggregatedById(id: string) {
        return this.prismaService.client.video.findUnique({
            where: {
                id,
            },
            include: {
                comments: true,
            },
        });
    }

    getByName(name: string) {
        return this.prismaService.client.video.findUnique({
            where: {
                name,
            },
        });
    }

    getByChannelIds(channelIds: string[]): Promise<Video[]> {
        return this.prismaService.client.video.findMany({
            where: {
                channelId: {
                    in: channelIds,
                },
            },
        });
    }

    getFiltered(filter: VideoFilter) {
        return this.prismaService.client.video.findMany({
            where: {
                OR: [{
                    name: {
                        contains: filter.sentance ?? '',
                    },
                }, {
                    description: {
                        contains: filter.sentance ?? '',
                    },
                }],
            },
            orderBy: {
                views: filter.sortings.views,
                createdAt: filter.sortings.uploadedDate,
            },
            include: {
                comments: true,
            },
        });
    }
}
