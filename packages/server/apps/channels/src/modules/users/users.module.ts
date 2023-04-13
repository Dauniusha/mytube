import { Module } from '@nestjs/common';
import { UsersConsumer } from './users.consumer';
import { UsersService } from './users.service';

@Module({
    imports: [],
    providers: [UsersService],
    controllers: [UsersConsumer],
})
export class UsersModule {}
