import {Injectable} from '@nestjs/common';

import {ApprovedAny} from '@shared/types/commonTypes';
import {UserContext} from '@shared/db-contexts';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly userContext: UserContext) {}

  async getById(userId: string): Promise<ApprovedAny> {
    return await this.userContext.getById(userId);
  }

  async getAll(): Promise<ApprovedAny> {
    return await this.userContext.getAll();
  }

  async getUserByEmployeeId(employeeId: string): Promise<ApprovedAny> {
    return await this.userContext.getUserByEmployeeId(employeeId);
  }

  async getUserByEmail(email: string): Promise<ApprovedAny> {
    const user = await this.userContext.getUserByEmail(email);

    if (!user) {
      const userId = uuidv4();

      const newUser = {
        userId,
        email,
        status: 'active',
        userRoles: ['employee'],
      };

      await this.userContext.create(newUser, userId);
      return newUser;
    }

    return user;
  }
}
