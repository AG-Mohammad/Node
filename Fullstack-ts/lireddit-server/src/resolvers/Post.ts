import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getPosts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  getPost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => String)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | string> {
    const query = em.create(Post, { title });
    await em.persistAndFlush(query);
    return "Created successfully";
  }

  @Mutation(() => String, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | string> {
    const query = await em.findOne(Post, { id });
    if (!query) {
      return "ID Doesn't exist";
    }
    if (typeof title !== "undefined") {
      query.title = title;
      await em.persistAndFlush(query);
    }
    return "Updated";
  }

  @Mutation(() => String)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<String> {
    const query = await em.findOne(Post, { id });
    if (!query) {
      return "ID Doesn't exist";
    } else {
      await em.nativeDelete(Post, { id });
      return "Post deleted successfully";
    }
  }
}
