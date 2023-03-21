import {Injectable} from '@nestjs/common';
import {ApprovedAny} from '@shared/types/commonTypes';

import {ActivityContext} from '../db-contexts/activity.context';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activityContext: ActivityContext) {}
  async getAllActivities(): Promise<ApprovedAny> {
    return await this.activityContext.getAll();
  }

  async getActivityById(activityId: string): Promise<ApprovedAny> {
    return await this.activityContext.getById(activityId);
  }
}
