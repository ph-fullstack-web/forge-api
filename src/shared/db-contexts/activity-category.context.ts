import {DatabaseContext} from './db.context';
import {ActivityCategory} from '@src/activity-categories/activity-category.model';
import {ActivityCategoryConverters} from '@src/activity-categories/activity-categories.converters';

export class ActivityCategoryContext extends DatabaseContext<ActivityCategory> {
  constructor() {
    super(
      'activity_categories',
      ActivityCategoryConverters.activityCategoryConverter
    );
  }
}
