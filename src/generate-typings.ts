import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import * as path from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: path.join(process.cwd(), '../common/graphql.types.ts'),
});