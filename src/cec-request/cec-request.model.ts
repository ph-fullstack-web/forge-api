import {Activity} from '@src/activities/activity.model';
import {CECRequestAttachment} from './cec-request-attachment.model';

export class CECRequest {
  cecRequestId: string;
  userId: string;
  activity: Activity;
  activityDescription: string;
  dateCreated: string;
  dateStarted: string;
  dateCompleted: string;
  status: string;
  dateEvaluated: string;
  approverUserId?: string;
  approverComment?: string;
  attachments: CECRequestAttachment[];
}
