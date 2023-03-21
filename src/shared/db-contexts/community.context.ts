import {Community} from '@src/communities/community.model';
import {CommunitiesConverters} from '@src/communities/commuties.converters';
import {ApprovedAny} from '../types/commonTypes';
import {DatabaseContext} from './db.context';

export class CommunityContext extends DatabaseContext<Community> {
  constructor() {
    super('communities', CommunitiesConverters.communityConverter);
  }

  async getCommunityByManagerUserId(
    managerUserId: string
  ): Promise<ApprovedAny> {
    return await this.collection().doc(managerUserId).get();
  }
}
