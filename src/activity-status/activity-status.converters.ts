import {ActivityStatus} from './activity-status.model';

export class ActivityStatusConverters {
  static activityStatusConverter = {
    fromFirestore: (
      snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): ActivityStatus => {
      const data = snapshot.data();
      const activityStatus: ActivityStatus = {
        statusId: data.statusId,
        name: data.name,
      };

      return activityStatus;
    },
    toFirestore: (
      activityStatus: ActivityStatus
    ): FirebaseFirestore.DocumentData => {
      return {
        statusId: activityStatus.statusId,
        name: activityStatus.name,
      };
    },
  };
}
