import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ETLService} from '@src/shared/services/etl.service';
import {Response as ExpressResponse} from 'express';
import {Activity} from '@src/activities/activity.model';
import {Readable} from 'stream';
import {CsvParser} from 'nest-csv-parser';

@Controller('etl')
export class ETLController {
  constructor(
    private readonly etlService: ETLService,
    private readonly csvParser: CsvParser
  ) {}

  @Get('extractActvities')
  async extractActivities(
    @Res() res: ExpressResponse
  ): Promise<ExpressResponse> {
    const csv_data = await this.etlService.extractActivities();
    res.set('Content-Type', 'text/csv');
    res.set('Content-Disposition', 'attachment; filename=activity_data.csv');
    res.status(200);
    return res.send(csv_data);
  }

  @Post('loadActvities')
  @UseInterceptors(FileInterceptor('file'))
  async loadActivities(
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('No file was uploaded.');
    } else if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('Invalid file type.');
    } else {
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      const readableStream = Readable.from(file.buffer);
      const activities = await this.csvParser.parse(
        readableStream,
        Activity,
        null,
        null,
        {strict: true, separator: ','}
      );
      await this.etlService.insertActivities(activities);
    }
  }
}
