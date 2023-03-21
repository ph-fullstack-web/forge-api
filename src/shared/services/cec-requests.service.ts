import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {CECAttachmentDeleteRequest} from '@src/cec-request/cec-attachment-delete-request.model';
import {CECRequestAttachment} from '@src/cec-request/cec-request-attachment.model';
import {CECRequest} from '@src/cec-request/cec-request.model';
import {CECUpdateStatusRequestModel} from '@src/cec-request/cec-update-status-request.model';
import {CECStatusEnum} from '@src/cec-request/enums';
import {CECRequestContext} from '../db-contexts/cec-request.context';
import {ApprovedAny} from '../types/commonTypes';

@Injectable()
export class CECRequestsService {
  constructor(private readonly cecRequestContext: CECRequestContext) {}

  async create(cecRequest: CECRequest) {
    await this.cecRequestContext.create(
      cecRequest,
      cecRequest.cecRequestId.toString()
    );
  }

  async getAll(): Promise<ApprovedAny> {
    return await this.cecRequestContext.getAll();
  }

  async getById(cecRequestId: string): Promise<ApprovedAny> {
    return await this.cecRequestContext.getById(cecRequestId);
  }

  async getByCECRequestId(cecRequestId: string): Promise<ApprovedAny> {
    return await this.cecRequestContext.getById(cecRequestId);
  }

  async uploadAttachments(
    userId: string,
    cecRequestId: string,
    files: Array<Express.Multer.File>
  ) {
    await this.cecRequestContext.uploadAttachments(userId, cecRequestId, files);
  }

  async getAttachments(
    userId: string,
    cecRequestId: string,
    attachments: CECRequestAttachment[]
  ): Promise<ApprovedAny> {
    return await this.cecRequestContext.getAttachments(
      userId,
      cecRequestId,
      attachments
    );
  }

  async deleteAttachment(attachmentToDelete: CECAttachmentDeleteRequest) {
    await this.cecRequestContext.deleteAttachment(
      attachmentToDelete.userId,
      attachmentToDelete.cecRequestId,
      attachmentToDelete.file
    );
  }

  async getByUserId(userId: string): Promise<ApprovedAny> {
    return await this.cecRequestContext.getByUserId(userId);
  }

  async update(statusRequestData: CECUpdateStatusRequestModel) {
    if (
      statusRequestData.status.toLowerCase() ===
        CECStatusEnum.Rejected.toLowerCase() &&
      (!statusRequestData.comment || statusRequestData.comment?.length === 0)
    ) {
      throw new BadRequestException('Please provide Comment.');
    }

    const cecRequest = await this.getById(statusRequestData.cecRequestId);

    if (!cecRequest) {
      throw new NotFoundException('Invalid CEC Request ID!');
    }

    cecRequest.status = statusRequestData.status;
    cecRequest.comment = statusRequestData.comment;

    await this.cecRequestContext.update(
      cecRequest,
      statusRequestData.cecRequestId
    );
  }

  async delete(cecRequestId: string) {
    await this.cecRequestContext.delete(cecRequestId);
  }
}
