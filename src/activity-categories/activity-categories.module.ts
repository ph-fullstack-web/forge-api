import {Module} from '@nestjs/common';

import {SharedModule} from '@src/shared/shared.module';
import {ActivityCategoriesResolvers} from './activity-categories.resolvers';

@Module({
  imports: [SharedModule],
  providers: [ActivityCategoriesResolvers],
})
export class ActivityCategoriesModule {}
