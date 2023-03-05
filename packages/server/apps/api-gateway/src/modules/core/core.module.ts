import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Global()
@Module({
    imports: [JwtModule],
    providers: [JwtStrategy],
    controllers: [],
    exports: [JwtModule],
})
export class CoreModule {}
