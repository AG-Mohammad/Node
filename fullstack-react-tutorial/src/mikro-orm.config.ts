import { __prod__ } from "./constant";
import Post from "./entities/Post.entity";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import User from "./entities/User.entity";

export default {
  migrations: {
    path: path.join(__dirname, `./migrations`),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "fullstack",
  password: "admin",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
