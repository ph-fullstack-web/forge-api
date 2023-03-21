import {Injectable} from '@nestjs/common';
import {ActivityStatusContext} from '@shared/db-contexts/activity-status.context';
import {ApprovedAny} from '../types/commonTypes';

@Injectable()
export class ActivityStatusService {
  constructor(private readonly activityStatusContext: ActivityStatusContext) {}

  async getActivityStatus(): Promise<ApprovedAny> {
    return await this.activityStatusContext.getAll();
  }

  async getActivityStatusById(activityStatusId: number): Promise<ApprovedAny> {
    return await this.activityStatusContext.getById(
      activityStatusId.toString()
    );
  }
}
