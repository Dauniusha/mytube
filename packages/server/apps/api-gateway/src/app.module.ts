import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Void } from '@mytube/shared/core/scalars/void.scalar';
import { DateScalar } from '@mytube/shared/core/scalars/date.scalar';
import { UsersModule } from './modules/users/users.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { VideosModule } from './modules/videos/videos.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'apps/api-gateway/src/.env',
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
            resolvers: { Void },
            buildSchemaOptions: {
                dateScalarMode: 'timestamp',
            },
        }),
        CoreModule,
        UsersModule,
        ChannelsModule,
        VideosModule,
    ],
    providers: [DateScalar],
    controllers: [],
})
export class AppModule {}
