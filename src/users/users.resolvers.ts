import {Args, Query, Resolver} from '@nestjs/graphql';

import {UsersService} from '@shared/services/users.service';
import {ApprovedAny} from '@shared/types/commonTypes';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async users(): Promise<ApprovedAny> {
    return await this.usersService.getAll();
  }

  @Query()
  async user(
    @Args('userId', {type: () => String!}) userId: string
  ): Promise<ApprovedAny> {
    return await this.usersService.getById(userId);
  }
}
