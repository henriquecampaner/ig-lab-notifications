import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateNotificationBody {
  @Field()
  @IsUUID()
  recipientId: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsNotEmpty()
  content: string;
}
