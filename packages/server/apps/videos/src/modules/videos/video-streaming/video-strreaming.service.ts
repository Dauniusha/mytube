import { Injectable } from "@nestjs/common";
import { Response } from 'express';
import { S3Service } from "../infrastructure/s3.service";
import { Readable } from "stream";
import { VideosRepository } from "../repositories/videos.repository";

@Injectable()
export class VideoStreamingService {
    private chunkSize = 10 ** 6; // 1MB

    constructor(
        private readonly s3Service: S3Service,
        private readonly videosRepository: VideosRepository,    
    ) {}

    async getChunk(id: string, range: string) {
        const start = Number(range.replace(/\D/g, ""));
        
        const video = await this.videosRepository.getById(id);

        if (!video) {
            throw new Error(`Video with id ${id} wa not found.`);
        } 

        const size = await this.s3Service.getVideoSize(id);
        const end = Math.min(start + this.chunkSize, size - 1);

        const stream = await this.s3Service.getVideo(id, start, this.chunkSize);

        return {
            data: stream,
            size,
            start,
            end,
        };
    }
}
