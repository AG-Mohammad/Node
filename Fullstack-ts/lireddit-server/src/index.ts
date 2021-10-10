import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/Post";
import "reflect-metadata";
import { UserResolver } from "./resolvers/User";
import Redis from "ioredis";
import session from "express-session";
import connect from "connect-redis";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

//import { MyContext } from "./types";

const main = async () => {
  const conn = createConnection({
    type: "postgres",
    database: "lireddit2",
    username: "postgres",
    password: "admin",
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connect(session);
  const redis = new Redis();
  console.log("__prod__", __prod__);
  app.use(
    session({
      name: COOKIE_NAME,
      secret: "totsASecretShhh",
      store: new RedisStore({ client: redis as any, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "strict",
        secure: __prod__,
      },
      saveUninitialized: false,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: new RegExp("/*/") },
  });

  app.listen(4000, () => {
    console.log("--Port: 4000");
  });
};
main().catch((err) => {
  console.log(err);
});
