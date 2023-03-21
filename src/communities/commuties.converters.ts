import {Community} from './community.model';

export class CommunitiesConverters {
  static communityConverter = {
    fromFirestore: (
      snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): Community => snapshot.data() as Community,
    toFirestore: (community: Community): FirebaseFirestore.DocumentData =>
      community,
  };
}
