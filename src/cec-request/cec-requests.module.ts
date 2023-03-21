import {Module} from '@nestjs/common';

import {SharedModule} from '@shared/shared.module';

import {CECRequestsController} from './cec-requests.controller';
import {CECRequestsResolvers} from './cec-requests.resolvers';

@Module({
  imports: [SharedModule],
  providers: [CECRequestsResolvers],
  controllers: [CECRequestsController],
})
export class CECRequestsModule {}
