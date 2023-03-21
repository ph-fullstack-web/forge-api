import {Args, Int, Query, Resolver} from '@nestjs/graphql';

import {ActivityStatusService} from '@src/shared/services/activity-status.service';
import {ApprovedAny} from '@src/shared/types/commonTypes';

@Resolver('ActivityStatus')
export class ActivityStatusResolvers {
  constructor(private readonly activityStatusService: ActivityStatusService) {}

  @Query()
  async activityStatuses(): Promise<ApprovedAny> {
    return await this.activityStatusService.getActivityStatus();
  }

  @Query()
  async activityStatus(
    @Args('statusId', {type: () => Int!}) statusId: number
  ): Promise<ApprovedAny> {
    return await this.activityStatusService.getActivityStatusById(statusId);
  }
}
