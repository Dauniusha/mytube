import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './repositories/users.repository';

@Module({
    imports: [JwtModule],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController],
})
export class AuthModule {}
