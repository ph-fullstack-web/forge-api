import {env} from 'process';

interface IAppConfig {
  Firebase: {
    ProjectId: string;
    ClientEmail: string;
    PrivateKey: string;
    StorageBucket: string;
  };
}

export const AppConfig: IAppConfig = {
  Firebase: {
    ProjectId: env.PROJECT_ID,
    ClientEmail: env.CLIENT_EMAIL,
    PrivateKey: env.PRIVATE_KEY,
    StorageBucket: env.STORAGE_BUCKET,
  },
};
