import {CECRequest} from './cec-request.model';

export class CECRequestsConverters {
  static cecRequestConverter = {
    fromFirestore: (
      snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): CECRequest => {
      const data = snapshot.data();
      const cecRequest: CECRequest = {
        cecRequestId: data.cecRequestId,
        activity: data.activity,
        activityDescription: data.activityDescription,
        dateCreated: data.dateCreated,
        dateStarted: data.dateCompleted,
        dateCompleted: data.dateCompleted,
        dateEvaluated: data.dateEvaluated,
        status: data.status,
        approverComment: data.approverComment,
        userId: data.userId,
        approverUserId: data.approverUserId,
        attachments: data.attachments,
      };

      return cecRequest;
    },
    toFirestore: (cecRequest: CECRequest): FirebaseFirestore.DocumentData => {
      return {
        cecRequestId: cecRequest.cecRequestId,
        activity: cecRequest.activity,
        activityDescription: cecRequest.activityDescription,
        dateCreated: cecRequest.dateCreated,
        dateStarted: cecRequest.dateCompleted,
        dateCompleted: cecRequest.dateCompleted,
        dateEvaluated: cecRequest.dateEvaluated,
        status: cecRequest.status,
        approverComment: cecRequest.approverComment,
        userId: cecRequest.userId,
        approverUserId: cecRequest.approverUserId,
        attachments: cecRequest.attachments,
      };
    },
  };
}
