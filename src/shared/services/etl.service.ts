import {Injectable} from '@nestjs/common';
import {ActivityContext} from '../db-contexts';
import {parse as Parser} from 'json2csv';
import {ParsedData} from 'nest-csv-parser';
import {Activity} from '@src/activities/activity.model';
import {ApprovedAny} from '../types/commonTypes';

@Injectable()
export class ETLService {
  constructor(private readonly activityContext: ActivityContext) {}

  async extractActivities(): Promise<string> {
    const activities = await this.activityContext.getAll();
    const activities_data = JSON.parse(JSON.stringify(activities));
    if (typeof activities_data === 'object' && Array.isArray(activities_data)) {
      //Delete id property which is not part of Activity class
      activities_data.forEach(a => delete a['id']);
    }
    const csv_data = Parser(activities_data);
    return csv_data;
  }

  async insertActivities(activities: ParsedData<ApprovedAny>): Promise<void> {
    const activityArray = new Array<Activity>();
    activities.list.forEach(activity => {
      //Convert points to number if the type is string
      if (typeof activity['points'] === 'string') {
        activity['points'] = +activity['points'];
      }
      activityArray.push(activity);
    });
    await this.activityContext.insertActivities(
      this.convertToPlainObject(activityArray)
    );
  }

  // Converts to plain object to resolve below issue
  // Firestore doesn't support JavaScript objects with custom prototypes (i.e. objects that were created via the "new" operator)
  private convertToPlainObject(obj: ApprovedAny) {
    if (typeof obj === 'object' && Array.isArray(obj)) {
      return [...obj].map(o => this.convertToPlainObject(o));
    }
    if (
      typeof obj === 'object' &&
      Object.getPrototypeOf(obj).constructor.name !== 'Date' &&
      Object.getPrototypeOf(obj).constructor.name !== 'Timestamp'
    ) {
      return Object.entries(obj).reduce((prev, curr) => ({
        ...prev,
        [curr[0]]: this.convertToPlainObject(curr[1]),
      }));
    }

    return obj;
  }
}
