import {DatabaseContext} from './db.context';
import {ActivityStatus} from '@src/activity-status/activity-status.model';
import {ActivityStatusConverters} from '@src/activity-status/activity-status.converters';

export class ActivityStatusContext extends DatabaseContext<ActivityStatus> {
  constructor() {
    super('activity_status', ActivityStatusConverters.activityStatusConverter);
  }
}
