import {Injectable} from '@nestjs/common';
import {ActivityCategoryContext} from '@shared/db-contexts/activity-category.context';
import {ApprovedAny} from '../types/commonTypes';

@Injectable()
export class ActivityCategoriesService {
  constructor(
    private readonly activityCategoryContext: ActivityCategoryContext
  ) {}

  async getActivityCategories(): Promise<ApprovedAny> {
    return await this.activityCategoryContext.getAll();
  }

  async getActivityCategoryId(
    activityCategoryId: number
  ): Promise<ApprovedAny> {
    return await this.activityCategoryContext.getById(
      activityCategoryId.toString()
    );
  }
}
