import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";
import { EntityManager } from "@mikro-orm/knex";
import { COOKIE_NAME } from "../constants";

@InputType()
class UserInput {
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
class userRes {
  @Field(() => [FieldError], { nullable: true })
  err?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: +req.session.userId });
    return user;
  }

  @Query(() => [User])
  getUsers(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  getUserByID(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  @Query(() => User, { nullable: true })
  getUser(
    @Arg("username") username: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { username });
  }

  @Mutation(() => userRes, { nullable: true })
  async login(
    @Arg("options") option: UserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<userRes> {
    const query = await em.findOne(User, { username: option.username });
    if (!query) {
      return {
        err: [
          {
            field: "username",
            msg: "User Doesn't Exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(query.password, option.password);
    if (!valid) {
      return {
        err: [
          {
            field: "password",
            msg: "Wrong Password!",
          },
        ],
      };
    }
    req.session.userId = query.id.toString();
    return {
      user: query,
    };
  }

  @Mutation(() => userRes, { nullable: true })
  async createUser(
    @Arg("options") option: UserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<any | string> {
    if (option.username.length <= 2) {
      return {
        err: [
          {
            field: "username",
            msg: "Username is too short",
          },
        ],
      };
    }
    if (option.username.length > 13) {
      return {
        err: [
          {
            field: "username",
            msg: "Username is too Long",
          },
        ],
      };
    }
    if (option.password.length < 6) {
      return {
        err: [
          {
            field: "password",
            msg: "Password is too short (6+)",
          },
        ],
      };
    }
    if (option.password.length > 20) {
      return {
        err: [
          {
            field: "password",
            msg: "Password is too Long",
          },
        ],
      };
    }
    option.password = await argon2.hash(option.password);
    let user;
    try {
      const results = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: option.username,
          password: option.password,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      user = results[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          err: [
            {
              field: "username",
              msg: "Username already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user.id.toString();

    return { user };
  }

  @Mutation(() => String)
  async updateUser(
    @Arg("id") id: number,
    @Arg("options") option: UserInput,

    @Ctx() { em }: MyContext
  ): Promise<User | string> {
    const query = await em.findOne(User, { id });
    if (!query) {
      return "ID Doesn't exist";
    } else {
      query.username = option.username;
      query.password = await argon2.hash(option.password);
      await em.persistAndFlush(query);

      return "Updated";
    }
  }

  @Mutation(() => String)
  async deleteUser(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<String> {
    const query = await em.findOne(User, { id });
    if (!query) {
      return "ID Doesn't exist";
    } else {
      await em.nativeDelete(User, { id });
      return "User deleted successfully";
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
