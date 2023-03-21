import {Injectable} from '@nestjs/common';
import {GqlOptionsFactory, GqlModuleOptions} from '@nestjs/graphql';
//import * as path from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
    };
  }
}
