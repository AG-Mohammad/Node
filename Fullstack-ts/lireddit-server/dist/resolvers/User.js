"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
let UserInput = class UserInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "msg", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let userRes = class userRes {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], userRes.prototype, "err", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], userRes.prototype, "user", void 0);
userRes = __decorate([
    (0, type_graphql_1.ObjectType)()
], userRes);
let UserResolver = class UserResolver {
    me({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const user = yield em.findOne(User_1.User, { id: +req.session.userId });
            return user;
        });
    }
    getUsers({ em }) {
        return em.find(User_1.User, {});
    }
    getUserByID(id, { em }) {
        return em.findOne(User_1.User, { id });
    }
    getUser(username, { em }) {
        return em.findOne(User_1.User, { username });
    }
    login(option, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield em.findOne(User_1.User, { username: option.username });
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
            const valid = yield argon2_1.default.verify(query.password, option.password);
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
        });
    }
    createUser(option, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            option.password = yield argon2_1.default.hash(option.password);
            let user;
            try {
                const results = yield em
                    .createQueryBuilder(User_1.User)
                    .getKnexQuery()
                    .insert({
                    username: option.username,
                    password: option.password,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                    .returning("*");
                user = results[0];
            }
            catch (error) {
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
        });
    }
    updateUser(id, option, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield em.findOne(User_1.User, { id });
            if (!query) {
                return "ID Doesn't exist";
            }
            else {
                query.username = option.username;
                query.password = yield argon2_1.default.hash(option.password);
                yield em.persistAndFlush(query);
                return "Updated";
            }
        });
    }
    deleteUser(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield em.findOne(User_1.User, { id });
            if (!query) {
                return "ID Doesn't exist";
            }
            else {
                yield em.nativeDelete(User_1.User, { id });
                return "User deleted successfully";
            }
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserByID", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userRes, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userRes, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map