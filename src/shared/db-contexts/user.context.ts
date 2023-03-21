import {User} from '@src/users/user.model';
import {UsersConveters} from '@src/users/users.converters';
import {DatabaseContext} from './db.context';
import {ApprovedAny} from '@shared/types/commonTypes';

export class UserContext extends DatabaseContext<User> {
  constructor() {
    super('users', UsersConveters.userConverter);
  }

  async getUserByEmployeeId(employeeId: string): Promise<ApprovedAny> {
    return await this.collection().doc(employeeId).get();
  }

  async getUserByEmail(email: string): Promise<ApprovedAny> {
    const userQueryRes = await this.collection()
      .where('email', '==', email)
      .get();
    const [user] = userQueryRes.docs;

    return user?.data();
  }
}
