import {Injectable} from '@nestjs/common';
import {DatabaseContext} from './db.context';
import {Activity} from '@src/activities/activity.model';
import {ActivitiesConverters} from '@src/activities/activities.converters';
import {ApprovedAny} from '../types/commonTypes';

@Injectable()
export class ActivityContext extends DatabaseContext<Activity> {
  constructor() {
    super('activities', ActivitiesConverters.activityConverter);
  }

  async getAllActivities(): Promise<ApprovedAny> {
    return await this.collection().doc().get();
  }

  async insertActivities(activities: Array<Activity>): Promise<void> {
    activities.forEach(async activity => {
      await this.create(activity, activity.activityId);
    });
  }
}
