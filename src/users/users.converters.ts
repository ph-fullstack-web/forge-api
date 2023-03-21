import {User} from './user.model';

export class UsersConveters {
  static userConverter = {
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User =>
      snapshot.data() as User,
    toFirestore: (user: User): FirebaseFirestore.DocumentData => user,
  };
}
