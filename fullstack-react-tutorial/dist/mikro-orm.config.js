"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const Post_entity_1 = __importDefault(require("./entities/Post.entity"));
const path_1 = __importDefault(require("path"));
const User_entity_1 = __importDefault(require("./entities/User.entity"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, `./migrations`),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post_entity_1.default, User_entity_1.default],
    dbName: "fullstack",
    password: "admin",
    type: "postgresql",
    debug: !constant_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map