import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class NotificationId {
  @Field()
  @IsUUID()
  notificationId: string;
}
