import User from "../entities/User.entity";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  msg: string;
}

@ObjectType()
class UserResponses {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponses)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponses> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            msg: "username is too short",
          },
        ],
      };
    }
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            msg: "password is too short",
          },
        ],
      };
    }
    const hasedpass = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hasedpass,
    });
    await em.persistAndFlush(user);

    return { user };
  }

  @Mutation(() => UserResponses)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponses> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [{ field: "username", msg: "username doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            msg: "Incorrect password",
          },
        ],
      };
    }

    return { user };
  }
}
