import {Controller, Post} from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Post()
  pong(): string {
    return 'Pong';
  }
}
