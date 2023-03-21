import {CECRequestAttachment} from './cec-request-attachment.model';

export class CECAttachmentDeleteRequest {
  userId: string;
  cecRequestId: string;
  file: CECRequestAttachment;
}
