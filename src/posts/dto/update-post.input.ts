import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
