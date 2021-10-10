import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt = Date;

  @Field()
  @UpdateDateColumn()
  updatedAt = Date;

  @Field()
  @Column()
  title!: string;
}
