import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
    imports: [],
    providers: [PrismaService, UsersRepository],
    exports: [PrismaService, UsersRepository],
})
export class CoreModule {}
