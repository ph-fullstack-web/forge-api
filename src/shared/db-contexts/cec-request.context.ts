import * as admin from 'firebase-admin';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {CECRequestAttachment} from '@src/cec-request/cec-request-attachment.model';
import {CECRequest} from '@src/cec-request/cec-request.model';
import {CECRequestsConverters} from '@src/cec-request/cec-requests.converters';
import {ApprovedAny} from '../types/commonTypes';
import {DatabaseContext} from './db.context';

@Injectable()
export class CECRequestContext extends DatabaseContext<CECRequest> {
  constructor() {
    super('cecRequests', CECRequestsConverters.cecRequestConverter);

    this.dbContext.settings({ignoreUndefinedProperties: true});
  }

  async uploadAttachments(
    userId: string,
    cecRequestId: string,
    files: Array<Express.Multer.File>
  ) {
    files.forEach(async file => {
      const fileBucket = this.store
        .bucket()
        .file(`${userId}/${cecRequestId}/${file.originalname}`);

      const writeStream = fileBucket.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });

      writeStream.on('error', () => {
        throw new InternalServerErrorException();
      });
      writeStream.end(file.buffer);

      const attachment: CECRequestAttachment = {
        fileName: file.originalname,
        fileSize: file.size,
      };
      await this.updateCECRequestAttachment(cecRequestId, attachment);
    });
  }

  async updateCECRequestAttachment(
    cecRequestId: string,
    attachment: CECRequestAttachment
  ): Promise<ApprovedAny> {
    return await this.collection()
      .doc(cecRequestId)
      .update({
        attachments: admin.firestore.FieldValue.arrayUnion(attachment),
      });
  }

  async getAttachments(
    userId: string,
    cecRequestId: string,
    files: CECRequestAttachment[]
  ): Promise<CECRequestAttachment[]> {
    if (files.length === 0) {
      return null;
    }
    files.forEach(async file => {
      const [url] = await this.store
        .bucket()
        .file(`${userId}/${cecRequestId}/${file.fileName}`)
        .getSignedUrl({
          action: 'read',
          expires: Date.now() + 2000 * 60 * 60,
        });

      file.signedUrl = url;
    });

    return files;
  }

  async deleteAttachment(
    userId: string,
    cecRequestId: string,
    file: CECRequestAttachment
  ) {
    await this.store
      .bucket()
      .file(`${userId}/${cecRequestId}/${file.fileName}`)
      .delete();

    await this.deleteCECRequestAttachment(cecRequestId, file);
  }

  async deleteCECRequestAttachment(
    cecRequestId: string,
    file: CECRequestAttachment
  ): Promise<ApprovedAny> {
    return await this.collection()
      .doc(cecRequestId)
      .update({
        attachments: admin.firestore.FieldValue.arrayRemove(file),
      });
  }

  async getByUserId(userId: string) {
    const cecRequestQueryRes = await this.collection()
      .where('userId', '==', userId)
      .get();
    const cecRequestsDocs = cecRequestQueryRes.docs;

    const cecRequests = [];

    cecRequestsDocs.forEach(i => {
      cecRequests.push(i.data());
    });

    return cecRequests;
  }
}
