import {Module} from '@nestjs/common';

import {SharedModule} from '@shared/shared.module';
import {GqlConfigService} from './gql-config.service';

@Module({
  imports: [SharedModule],
  providers: [GqlConfigService],
  exports: [GqlConfigService],
})
export class GqlConfigModule {}
