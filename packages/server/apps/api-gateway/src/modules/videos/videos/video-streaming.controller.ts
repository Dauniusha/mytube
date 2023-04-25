import { Controller, Get, Param, Headers, UseGuards, StreamableFile, Res, HttpCode } from "@nestjs/common";
import { JwtAuthGuard } from "../../core/auth";
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";
import { Response } from 'express';
import { Readable } from "stream";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Controller('videos')
// @UseGuards(JwtAuthGuard)
export class VideoStreamingController {
    private readonly videoStreamingApi: HttpService;

    constructor(configService: ConfigService) {
        this.videoStreamingApi = new HttpService(axios.create({
            baseURL: configService.get('VIDEO_STREAMING_API_URL'),
        }));
    }

    @Get(':id/play')
    @HttpCode(206)
    getStream(
        @Param('id') id: string,
        @Headers('range') range: string,
        @Res({ passthrough: true }) res: Response,
    ): Observable<StreamableFile> {
        return this.videoStreamingApi.get<Readable>(id, {
            headers: {
                range,
            },
            responseType: 'stream',
        }).pipe(
            map((x) => {
                res.set({ ...x.headers });
                return new StreamableFile(x.data);
            }),
        );
    }
}
