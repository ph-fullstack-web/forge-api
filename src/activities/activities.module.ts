import {Module} from '@nestjs/common';

import {SharedModule} from '@shared/shared.module';
import {ActivitiesResolvers} from './activities.resolvers';

@Module({
  imports: [SharedModule],
  providers: [ActivitiesResolvers],
})
export class ActivitiesModule {}
