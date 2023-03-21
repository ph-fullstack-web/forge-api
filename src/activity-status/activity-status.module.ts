import {Module} from '@nestjs/common';

import {SharedModule} from '@src/shared/shared.module';
import {ActivityStatusResolvers} from './activity-status.resolvers';

@Module({
  imports: [SharedModule],
  providers: [ActivityStatusResolvers],
})
export class ActivityStatusModule {}
