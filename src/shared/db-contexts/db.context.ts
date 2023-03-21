import {NotFoundException} from '@nestjs/common';
import * as admin from 'firebase-admin';
import {ApprovedAny} from '@shared/types/commonTypes';

export class DatabaseContext<Document extends {[x: string]: ApprovedAny}> {
  protected readonly dbContext: admin.firestore.Firestore;
  protected readonly store: admin.storage.Storage;
  private readonly collectionName: string;
  private readonly converter: admin.firestore.FirestoreDataConverter<Document>;

  constructor(
    collectionName: string,
    converter: admin.firestore.FirestoreDataConverter<Document>
  ) {
    this.collectionName = collectionName;
    this.dbContext = admin.firestore();
    this.store = admin.storage();
    this.converter = converter;
  }

  async getAll(): Promise<ApprovedAny> {
    const result = await this.dbContext
      .collection(this.collectionName)
      .withConverter<Document>(this.converter)
      .get();

    const data = result.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Promise.resolve(data);
  }

  async getById(id: string): Promise<ApprovedAny> {
    const result = await this.dbContext
      .collection(this.collectionName)
      .withConverter<Document>(this.converter)
      .doc(id)
      .get();

    return Promise.resolve(result.data());
  }

  async create(data: Document, id?: string): Promise<void> {
    if (id)
      await this.dbContext.collection(this.collectionName).doc(id).set(data);
    else {
      const document = this.dbContext.collection(this.collectionName).doc();
      await document.set(data);
    }
  }

  async update(data: Document, id: string): Promise<void> {
    if (!(await this.exist(id)))
      throw new NotFoundException('Record not found');

    await this.dbContext
      .collection(this.collectionName)
      .doc(id)
      .update({...data});
  }

  async delete(id: string) {
    await this.dbContext.collection(this.collectionName).doc(id).delete();
  }

  protected collection(): admin.firestore.CollectionReference<Document> {
    return this.dbContext
      .collection(this.collectionName)
      .withConverter<Document>(this.converter);
  }

  private async exist(id: string): Promise<boolean> {
    const employee = await this.getById(id);

    return Promise.resolve(!!employee);
  }
}
