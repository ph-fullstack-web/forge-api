import {ActivityCategory} from './activity-category.model';

export class ActivityCategoryConverters {
  static activityCategoryConverter = {
    fromFirestore: (
      snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): ActivityCategory => {
      const data = snapshot.data();
      const activityCategory: ActivityCategory = {
        activityCategoryId: data.activityCategoryId,
        name: data.name,
      };

      return activityCategory;
    },
    toFirestore: (
      activityCategory: ActivityCategory
    ): FirebaseFirestore.DocumentData => {
      return {
        activityCategoryId: activityCategory.activityCategoryId,
        name: activityCategory.name,
      };
    },
  };
}
