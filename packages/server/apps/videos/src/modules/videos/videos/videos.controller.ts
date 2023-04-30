import { CreateVideoInput, GetVideoArgs, PresignedUrl, Video } from "@mytube/shared/videos/models/videos";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GET_VIDEO_TOPIC, UPLOAD_VIDEO_TOPIC } from "@mytube/shared/videos/constants/videos";
import { VideosService } from "./videos.service";

@Controller()
export class VideosController {
    constructor(
        private readonly videosService: VideosService,
    ) {}

    @MessagePattern(UPLOAD_VIDEO_TOPIC)
    upload(@Payload('message') data: CreateVideoInput): Promise<PresignedUrl> {
        return this.videosService.create(data);
    }

    @MessagePattern(GET_VIDEO_TOPIC)
    get(@Payload('message') args: GetVideoArgs): Promise<Video> {
        return this.videosService.getById(args);
    }
}
