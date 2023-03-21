import {Args, Int, Query, Resolver} from '@nestjs/graphql';
import {ActivitiesService} from '@src/shared/services';
import {ApprovedAny} from './../shared/types/commonTypes';

@Resolver('Activity')
export class ActivitiesResolvers {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Query()
  async activities(): Promise<ApprovedAny> {
    return await this.activitiesService.getAllActivities();
  }

  @Query()
  async activity(
    @Args('activityId', {type: () => String}) activityId: string
  ): Promise<ApprovedAny> {
    return await this.activitiesService.getActivityById(activityId);
  }
}
