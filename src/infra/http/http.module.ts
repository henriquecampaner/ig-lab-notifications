import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { RestfulModule } from './restful/restful.module';

@Module({
  imports: [GraphqlModule, RestfulModule],
})
export class HttpModule {}
