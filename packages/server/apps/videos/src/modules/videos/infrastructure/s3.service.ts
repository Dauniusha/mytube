import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "minio";
import { Readable } from "stream";

@Injectable()
export class S3Service {
    private readonly minioClient: Client;

    private readonly videoBucket: string;

    private readonly expiration: number;

    constructor(configService: ConfigService) {
        this.minioClient = new Client({
            endPoint: configService.get('S3_URL'),
            port: Number(configService.get('S3_PORT')),
            useSSL: false,
            accessKey: configService.get('S3_ACCESS_KEY'),
            secretKey: configService.get('S3_SECRET_KEY'),
        });

        this.videoBucket = configService.get('S3_VIDEO_BUCKET');
        this.expiration = Number(configService.get('S3_PRESIGN_URL_EXPIRATION'));
    }

    createPresignUrl(key: string): Promise<string> {
        return this.minioClient.presignedPutObject(this.videoBucket, key + '.mp4', this.expiration);
    }

    getVideo(key: string, startByte: number, length: number): Promise<Readable> {
        return this.minioClient.getPartialObject(
            this.videoBucket,
            key + '.mp4',
            startByte,
            length,
        );
    }

    async getVideoSize(key: string): Promise<number> {
        const stat = await this.minioClient.statObject(this.videoBucket, key + '.mp4');
        return stat.size;
    }
}
