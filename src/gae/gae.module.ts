import {Module} from '@nestjs/common';
import {GAEController} from './gae.controller';

@Module({
  controllers: [GAEController],
})
export class GAEModule {}
