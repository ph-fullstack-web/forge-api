import {ApprovedAny} from '@shared/types/commonTypes';
import {Injectable} from '@nestjs/common';
import {CommunityContext} from '../db-contexts/community.context';

@Injectable()
export class CommunitiesService {
  constructor(private readonly communityContext: CommunityContext) {}

  async getCommunity(communityId: number): Promise<ApprovedAny> {
    return await this.communityContext.getById(communityId.toString());
  }
}
