import { Controller, Get, Param, StreamableFile, Headers, Req, Res, HttpCode } from "@nestjs/common";
import { Response } from 'express';
import { VideoStreamingService } from "./video-strreaming.service";

@Controller('stream')
export class VideoStreamingController {
    constructor(
        private readonly videoStreamingService: VideoStreamingService,
    ) {}

    @Get(':id')
    @HttpCode(206)
    async getStream(
        @Param('id') id: string,
        @Headers('range') range: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<StreamableFile> {
        const {
            data,
            end,
            size,
            start,
        } = await this.videoStreamingService.getChunk(id, range);

        res.set({
            'Content-Range': `bytes ${start}-${end}/${size}`
        });

        return new StreamableFile(data, { type: 'video/mp4' });
    }
}
