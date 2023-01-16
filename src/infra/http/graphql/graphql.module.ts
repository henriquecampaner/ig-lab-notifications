import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: process.env.NODE_ENV !== 'production',
    }),
  ],

  controllers: [],
  providers: [],
})
export class GraphqlModule {}
