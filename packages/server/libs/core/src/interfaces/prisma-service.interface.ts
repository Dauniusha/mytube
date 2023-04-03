import { PrismaClient } from "@prisma/client";

export interface IPrismaService {
    createTransaction: (...args: any[]) => any;
    get client(): PrismaClient;
}
