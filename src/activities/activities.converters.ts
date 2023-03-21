import {Activity} from './activity.model';

export class ActivitiesConverters {
  static activityConverter = {
    fromFirestore: (
      snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): Activity => {
      const data = snapshot.data();
      const activity: Activity = {
        activityCategory: data.activityCategory,
        activityId: data.activityId,
        name: data.name,
        points: data.points,
      };

      return activity;
    },
    toFirestore: (activity: Activity): FirebaseFirestore.DocumentData => {
      return {
        activityCategory: activity.activityCategory,
        activityId: activity.activityId,
        name: activity.name,
        points: activity.points,
      };
    },
  };
}
