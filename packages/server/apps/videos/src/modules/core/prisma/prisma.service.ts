import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPrismaService } from '@mytube/core';
import { PrismaClient } from '../../../prisma/generated';

@Injectable()
export class PrismaService implements IPrismaService {
    private readonly prismaClient: PrismaClient;

    constructor(private readonly configService: ConfigService) {
        this.prismaClient = new PrismaClient({
            datasources: { Videos: { url: this.configService.getOrThrow<string>('VIDEOS_DB_URL') } },
        });

        this.createTransaction = this.prismaClient.$transaction.bind(this.prismaClient);
    }

    createTransaction: typeof this.prismaClient.$transaction;

    get client(): PrismaClient {
        return this.prismaClient;
    }
}
