import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {ApprovedAny} from '@shared/types/commonTypes';
import {CECRequestsService, UsersService} from '@src/shared/services';
import {CECRequest} from './cec-request.model';

@Resolver('CECRequest')
export class CECRequestsResolvers {
  constructor(
    private readonly cecRequestsService: CECRequestsService,
    private readonly usersService: UsersService
  ) {}

  @Query()
  async cecRequests(
    @Args('userId', {type: () => String}) userId: string
  ): Promise<ApprovedAny> {
    if (userId) {
      return await this.cecRequestsService.getByUserId(userId);
    }

    return await this.cecRequestsService.getAll();
  }

  @Query()
  async cecRequest(
    @Args('cecRequestId', {type: () => String!}) cecRequestId: string
  ) {
    return await this.cecRequestsService.getById(cecRequestId);
  }

  @ResolveField('attachments')
  async getAttachments(@Parent() cecRequest: CECRequest) {
    const {userId, cecRequestId, attachments} = cecRequest;
    return this.cecRequestsService.getAttachments(
      userId,
      cecRequestId,
      attachments
    );
  }
}
