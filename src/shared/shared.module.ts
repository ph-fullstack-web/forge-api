import {Module, Provider} from '@nestjs/common';

import {
  ActivityContext,
  ActivityCategoryContext,
  ActivityStatusContext,
  CECRequestContext,
  CommunityContext,
  UserContext,
} from './db-contexts';

import {
  ActivitiesService,
  ActivityCategoriesService,
  ActivityStatusService,
  CommunitiesService,
  CECRequestsService,
  UsersService,
  ETLService,
} from './services';

import {ServiceUtil} from './utils/serviceUtil';

const services: Provider[] = [
  ActivitiesService,
  ActivityCategoriesService,
  ActivityStatusService,
  CommunitiesService,
  CECRequestsService,
  UsersService,
  ETLService,
];

const utils: Provider[] = [ServiceUtil];

const contexts: Provider[] = [
  ActivityContext,
  ActivityCategoryContext,
  ActivityStatusContext,
  CECRequestContext,
  CommunityContext,
  UserContext,
];

@Module({
  providers: [...services, ...contexts, ...utils],
  exports: services,
})
export class SharedModule {}
