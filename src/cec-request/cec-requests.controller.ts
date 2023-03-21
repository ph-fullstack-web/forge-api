import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {CECRequestsService} from '@src/shared/services/cec-requests.service';
import {CECRequest} from './cec-request.model';
import {v4 as uuidv4} from 'uuid';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import {ApprovedAny} from '@src/shared/types/commonTypes';
import {CECAttachmentDeleteRequest} from './cec-attachment-delete-request.model';
import {CECUpdateStatusRequestModel} from './cec-update-status-request.model';

@Controller('cecRequests')
export class CECRequestsController {
  constructor(private readonly cecRequestsService: CECRequestsService) {}

  @Post()
  async create(@Body() cecRequest: CECRequest): Promise<string> {
    if (!cecRequest.cecRequestId) {
      cecRequest.cecRequestId = uuidv4();
    }

    if (cecRequest.status === 'Pending for Approval') {
      if (!cecRequest.dateStarted || !cecRequest.dateCompleted) {
        throw new BadRequestException(
          'Approver Id, Date Started and Date Completed are required when submitting a CEC Request for approval.'
        );
      }
    }

    cecRequest.dateCreated = new Date().toISOString();
    await this.cecRequestsService.create(cecRequest);

    return cecRequest.cecRequestId;
  }

  @Delete(':cecRequestId')
  async delete(
    @Param('cecRequestId') cecRequestIdParam: string,
    @Body() cecRequestBody: Partial<CECRequest>
  ): Promise<void> {
    //TODO: Delete attachments and validations?

    if (cecRequestIdParam !== cecRequestBody.cecRequestId) {
      throw new BadRequestException('Unable to delete CEC request');
    }
    await this.cecRequestsService.delete(cecRequestIdParam);
  }

  @Post('attachments')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadCECRequestAttachments(
    @Body() {userId, cecRequestId}: ApprovedAny,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<void> {
    if (!files) return;

    await this.cecRequestsService.uploadAttachments(
      userId,
      cecRequestId,
      files
    );
  }

  @Post('attachments/delete')
  async deleteCECRequestAttachment(
    @Body() attachmentToDelete: CECAttachmentDeleteRequest
  ): Promise<void> {
    if (!attachmentToDelete.cecRequestId || !attachmentToDelete.file) {
      throw new BadRequestException(
        'CEC Request Id and Attachment filename are required.'
      );
    }

    this.cecRequestsService.deleteAttachment(attachmentToDelete);
  }

  @Put('updateStatus')
  @HttpCode(204)
  async updateStatus(@Body() statusRequestData: CECUpdateStatusRequestModel) {
    await this.cecRequestsService.update(statusRequestData);
  }
}
