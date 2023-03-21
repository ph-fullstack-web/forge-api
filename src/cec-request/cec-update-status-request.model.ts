import {CECStatusEnum} from './enums';

export class CECUpdateStatusRequestModel {
  cecRequestId: string;
  status: CECStatusEnum;
  comment?: string;
}
