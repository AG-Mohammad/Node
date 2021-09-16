import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import {
  cacheExchange,
  Cache,
  QueryInput,
  query,
} from "@urql/exchange-graphcache";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import {
  CreateUserMutation,
  LoginUserMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";
import theme from "../theme";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result: LoginUserMutation, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result: LoginUserMutation, args, cache, info) => {
            betterUpdateQuery<LoginUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.err) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          register: (_result: LoginUserMutation, args, cache, info) => {
            betterUpdateQuery<CreateUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.createUser.err) {
                  return query;
                } else {
                  return {
                    me: result.createUser.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});
function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
