import { Injectable } from "@nestjs/common";
import { CreateVideoInput, GetVideoArgs, PresignedUrl, Video as VideoDto } from "@mytube/shared/videos/models/videos";
import { VideosRepository } from "../repositories/videos.repository";
import { S3Service } from "../infrastructure/s3.service";
import { PrismaService } from "../../core/prisma/prisma.service";
import { Video } from "../../../prisma/generated";

@Injectable()
export class VideosService {
    constructor(
        private readonly transactionService: PrismaService,
        private readonly videosRepository: VideosRepository,
        private readonly s3Service: S3Service,
    ) {}

    async create(request: CreateVideoInput): Promise<PresignedUrl> {
        const video = await this.videosRepository.getByName(request.name);

        if (video) {
            throw new Error(`Video ${request.name} already exists on the service.`);
        }

        const uploadUrl = await this.transactionService.createTransaction(async (dbClient) => {     
            const video = await this.videosRepository.create({
                channelId: request.chanelId,
                description: request.description,
                name: request.name,
                preview: request.preview,
                path: '',
            });

            return this.s3Service.createPresignUrl(video.id);
        });

        return new PresignedUrl(uploadUrl);
    }

    private async view(video: Video) {
        await this.videosRepository.edit(video.id, {
            views: video.views + 1,
        });
    }

    private async getVideo(videoId: string): Promise<Video> {
        const video = await this.videosRepository.getById(videoId);

        if (!video) {
            throw new Error(`Video ${videoId} was not found.`);
        }

        return video;
    }

    async getById(request: GetVideoArgs): Promise<VideoDto> {
        const video = await this.videosRepository.getAggregatedById(request.id);

        if (!video) {
            throw new Error(`Video ${request.id} was not found.`);
        }

        await this.view(video);

        return new VideoDto(
            video.id,
            video.name,
            video.channelId,
            video.preview,
            video.likes,
            video.views,
            video.dislikes,
            video.createdAt,
            video.comments,
            video.description,
        );
    }

    async like(videoId: string) {
        const video = await this.getVideo(videoId);

        await this.videosRepository.edit(videoId, {
            likes: ++video.likes,
        });
    }

    async dislike(videoId: string) {
        const video = await this.getVideo(videoId);

        await this.videosRepository.edit(videoId, {
            dislikes: ++video.dislikes,
        });
    }
}
