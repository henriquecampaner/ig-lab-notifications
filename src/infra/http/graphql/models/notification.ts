import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class NotificationModelGraphql {
  @Field()
  id: string;

  @Field()
  recipientId: string;

  @Field()
  content: string;

  @Field()
  category: string;

  @Field(() => Date, { nullable: true })
  cancelledAt: Date;

  @Field(() => Date, { nullable: true })
  readAt: Date;
}

export { NotificationModelGraphql };
