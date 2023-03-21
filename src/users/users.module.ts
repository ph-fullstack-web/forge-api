import {Module} from '@nestjs/common';

import {SharedModule} from '@shared/shared.module';
import {UsersController} from './users.controller';
import {UsersResolvers} from './users.resolvers';

@Module({
  imports: [SharedModule],
  providers: [UsersResolvers],
  controllers: [UsersController],
})
export class UsersModule {}
