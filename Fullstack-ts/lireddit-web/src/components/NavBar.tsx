import { Button } from "@chakra-ui/button";
import { Box, Flex, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={1}>
          <b>Welcome {data.me.username}</b>
        </Box>
        {"|"}
        <Box ml={1}>
          <Button
            onClick={() => {
              logout();
            }}
            isLoading={fetchingLogout}
            variant="link"
            color="black"
          >
            Logout
          </Button>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex bg="gold" p={4}>
      <Box>
        <NextLink href="/">
          <Link style={{ textDecoration: "none" }}>
            <b style={{ fontSize: 20 }}>Logo</b>
          </Link>
        </NextLink>
      </Box>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
