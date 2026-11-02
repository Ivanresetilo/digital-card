import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => Int) id: number;
  @Field() name: string;
}

@ObjectType()
export class Experience {
  @Field(() => Int) id: number;
  @Field() company: string;
  @Field() position: string;
  @Field() period: string;
  @Field({ nullable: true }) achievements?: string;
}

@ObjectType()
export class Project {
  @Field(() => Int) id: number;
  @Field() name: string;
  @Field({ nullable: true }) url?: string;
}

@ObjectType()
export class Profile {
  @Field(() => Int) id: number;
  @Field() name: string;
  @Field() description: string;
  @Field({ nullable: true }) github?: string;
  @Field({ nullable: true }) linkedin?: string;
  @Field(() => [Skill]) skills: Skill[];
  @Field(() => [Experience]) experience: Experience[];
  @Field(() => [Project]) projects: Project[];
}
