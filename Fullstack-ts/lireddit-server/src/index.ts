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
//import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connect(session);
  const redisClient = new Redis("127.0.0.1:6379");
  console.log("__prod__", __prod__);
  app.use(
    session({
      name: COOKIE_NAME,
      secret: "keyboard cat",
      store: new RedisStore({ client: redisClient }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
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
    context: ({ req, res }) => ({ em: orm.em, req, res, session: req.session }),
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
