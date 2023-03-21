import {Controller, Get} from '@nestjs/common';
import {Public} from 'src/auth/public.decorator';

@Public()
@Controller(['_ah', '/'])
export class GAEController {
  constructor() {}

  @Get('start')
  start() {
    return 'ok';
  }

  @Get('health')
  health() {
    return 'ok';
  }

  @Get('')
  running() {
    return 'running';
  }
}
