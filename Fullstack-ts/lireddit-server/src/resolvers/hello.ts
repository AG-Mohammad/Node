import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello";
  }

  @Query(() => String)
  bye() {
    return "Bye";
  }
}
