import {Controller, Get, Param} from '@nestjs/common';

import {UsersService} from '@src/shared/services';
// import {User} from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get('getUserByEmail/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    const userEmployee = await this._usersService.getUserByEmail(
      email.toLowerCase()
    );

    // if (!userEmployee) {
    //   throw new NotFoundException('No user found!');
    // }

    return userEmployee;
  }
}
