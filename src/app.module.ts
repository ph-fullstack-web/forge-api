import {APP_FILTER, APP_GUARD} from '@nestjs/core';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {GraphQLModule} from '@nestjs/graphql';
//import {join} from 'path';

import {AuthGuard} from './auth/auth.guard';
import {GqlConfigModule} from './graphql/gql-config.module';
import {GqlConfigService} from './graphql/gql-config.service';
import {ActivitiesModule} from './activities/activities.module';
import {PingController} from './ping.controller';
import {AllExceptionsFilter} from './exception-catcher';
import {ActivityCategoriesModule} from './activity-categories/activity-categories.module';
import {UsersModule} from './users/users.module';
import {CECRequestsModule} from './cec-request/cec-requests.module';
import {GAEModule} from './gae/gae.module';
import {ETLModule} from './etl/etl.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [GqlConfigModule],
      useExisting: GqlConfigService,
    }),
    HttpModule,
    ActivitiesModule,
    ActivityCategoriesModule,
    UsersModule,
    CECRequestsModule,
    GAEModule,
    ETLModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PingController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, // uncomment this on live env.
  ],
})
export class AppModule {}
