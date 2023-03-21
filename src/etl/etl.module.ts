import {Module} from '@nestjs/common';

import {SharedModule} from '@shared/shared.module';
import {ETLController} from './etl.controller';

import {CsvModule} from 'nest-csv-parser';

@Module({
  imports: [SharedModule, CsvModule],
  controllers: [ETLController],
})
export class ETLModule {}
