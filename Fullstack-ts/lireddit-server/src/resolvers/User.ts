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
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { mailer } from "../utils/Mailer";
import { v4 } from "uuid";

@InputType()
class UserInput {
  @Field()
  username: string;
 
  @Field()
  email: string;

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
  @Mutation(() => userRes)
  async changePass(
    @Arg("token") token: string,
    @Arg("NewPass") NewPass: string,
    @Ctx() { redis, em }: MyContext
  ): Promise<userRes> {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return { err: [{ field: "token", msg: "token expired" }] };
    }

    const user = await em.findOne(User, { id: parseInt(userId) });

    user!.password = await argon2.hash(NewPass);
    await em.persistAndFlush(user!);

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPass(
    @Arg("email") email: string,
    @Ctx() { em, redis }: MyContext
  ) {
    const user = await em.findOne(User, { email });
    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    await mailer(
      "fzxty3wsbbaba72w@ethereal.email",
      `<a href="http://localhost:3000/change-password/${token}">Rest Password</a>`
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    console.log(req.session);
    if (!req.session.userId) {
      console.log("No session");
      return null;
    } else {
      const user = await em.findOne(User, { id: +req.session.userId });
      return user;
    }
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
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<userRes> {
    const query = await em.findOne(User, { username: username });
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
    const valid = await argon2.verify(query.password, password);
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
    console.log("session:", req.session);

    return {
      user: query,
    };
  }

  @Mutation(() => userRes, { nullable: true })
  async createUser(
    @Arg("options") option: UserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<any | string> {
    if (option.email.length <= 2) {
      return {
        err: [
          {
            field: "email",
            msg: "Email is too short",
          },
        ],
      };
    }
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
          email: option.email,
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
