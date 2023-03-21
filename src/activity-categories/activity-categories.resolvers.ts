import {Args, Int, Query, Resolver} from '@nestjs/graphql';

import {ActivityCategoriesService} from '@src/shared/services/activity-categories.service';
import {ApprovedAny} from '@src/shared/types/commonTypes';

@Resolver('ActivityCategories')
export class ActivityCategoriesResolvers {
  constructor(
    private readonly activityCategoriesService: ActivityCategoriesService
  ) {}

  @Query()
  async activityCategories(): Promise<ApprovedAny> {
    return await this.activityCategoriesService.getActivityCategories();
  }

  @Query()
  async activityCategory(
    @Args('activityCategoryId', {type: () => Int!}) activityCategoryId: number
  ): Promise<ApprovedAny> {
    return await this.activityCategoriesService.getActivityCategoryId(
      activityCategoryId
    );
  }
}
