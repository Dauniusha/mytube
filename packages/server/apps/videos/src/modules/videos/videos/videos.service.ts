import { Injectable } from "@nestjs/common";
import { CreateVideoInput, PresignedUrl } from "@mytube/shared/videos/models/videos";
import { VideosRepository } from "../repositories/videos.repository";
import { S3Service } from "../infrastructure/s3.service";
import { PrismaService } from "../../core/prisma/prisma.service";

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

    
}
